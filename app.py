import streamlit as st
import pandas as pd
import pickle
import numpy as np
# use Streamlit app.py to run this code
# LOAD MODEL AND DATA

@st.cache_data
def load_model():
    with open("country_risk_model.pkl", "rb") as f:
        model = pickle.load(f)
    return model

@st.cache_data
def load_data():
    df = pd.read_csv("country_features.csv")
    return df

model = load_model()
df = load_data()

# STREAMLIT UI

st.set_page_config(page_title="🌍 Country Safety / Risk Index", layout="wide")
st.title("🌍 Country Safety / Risk Index Dashboard")
st.write("Enter a country ISO3 code or name to see its risk index and top contributing factors.")

country_input = st.text_input("Country ISO3 (e.g., IND) or Name", "")

# HELPER FUNCTION

def get_country_risk(country_name_or_iso):
    search = country_name_or_iso.strip().lower()

    if 'ISO3' in df.columns:
        row = df[df['ISO3'].str.lower() == search]
    else:
        row = pd.DataFrame()
    
    if row.empty:
        if 'Country' in df.columns:
            row = df[df['Country'].str.lower() == search]
    
    if row.empty:
        return {"error": "Country not found!"}
    
    X = row.drop(columns=["ISO3", "INFORM_RISK"], errors='ignore')
    
    risk_index = model.predict(X)[0]
    
    if hasattr(model, 'feature_importances_'):
        importance = model.feature_importances_
        features = X.columns
        top_features = sorted(
            zip(features, importance),
            key=lambda x: x[1],
            reverse=True
        )[:5]
    else:
        top_features = []
    
    return {
        "country": country_name_or_iso.upper(),
        "risk_index": round(risk_index, 3),
        "top_factors": [(f, round(i,3)) for f, i in top_features]
    }

# DISPLAY RESULTS

if country_input:
    result = get_country_risk(country_input)
    if "error" in result:
        st.error(result["error"])
    else:
        st.subheader(f"📊 Safety / Risk Index for {result['country']}")
        st.metric("Risk Index", result['risk_index'])

        st.subheader("Top Factors Affecting Risk")
        for feat, impact in result['top_factors']:
            st.write(f"**{feat}** → Impact: {impact}")

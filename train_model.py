import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error

import shap

# =========================
# 1. LOAD DATA (RAW)
# =========================

file_path = r"C:\Users\Aaron Alphons Thomas\Desktop\country_safety_project\data\INFORM_Risk_Mid_2025_v071.xlsx"

df_raw = pd.read_excel(
    file_path,
    sheet_name="INFORM Risk Mid 2025 (a-z)",
    header=None
)

# Remove top metadata rows
df = df_raw.iloc[3:].reset_index(drop=True)

# =========================
# 2. SELECT COLUMNS BY INDEX
# =========================

df = df.iloc[:, [
    1,   # ISO3
    2,   # INFORM RISK
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,  # Hazard & Exposure
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,  # Vulnerability
    28, 29, 30, 31, 32, 33, 34  # Lack of Coping Capacity
]]

df.columns = [
    "ISO3",
    "INFORM_RISK",
    "Natural", "Earthquake", "River_Flood", "Tsunami",
    "Tropical_Cyclone", "Coastal_flood", "Drought", "Epidemic",
    "Human", "Projected_Conflict_Probability", "Current_Conflict_Intensity",
    "Socio_Economic_Vulnerability", "Development_Deprivation", "Inequality",
    "Economic_Dependency", "Vulnerable_Groups", "Uprooted_People",
    "Health_Conditions", "Children_U5", "Recent_Shocks",
    "Food_Security", "Other_Vulnerable_Groups",
    "Institutional", "DRR", "Governance", "Infrastructure",
    "Communication", "Physical_Infrastructure", "Access_to_Health_Care"
]

# =========================
# 3. CLEAN DATA
# =========================

for col in df.columns:
    if col != "ISO3":
        df[col] = pd.to_numeric(df[col], errors="coerce")

df = df.dropna(subset=["INFORM_RISK"])
df = df.fillna(df.mean(numeric_only=True))

# =========================
# 4. TRAIN / TEST SPLIT
# =========================

X = df.drop(columns=["ISO3", "INFORM_RISK"])
y = df["INFORM_RISK"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# 5. TRAIN MODEL
# =========================

model = RandomForestRegressor(
    n_estimators=300,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# =========================
# 6. EVALUATION
# =========================

y_pred = model.predict(X_test)

print(f"R² Score: {r2_score(y_test, y_pred):.3f}")
print(f"MAE: {mean_absolute_error(y_test, y_pred):.3f}")
print("✅ Model trained successfully")

# =========================
# 7. EXPLAINABILITY (WHY)
# =========================

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_train)

importance = np.abs(shap_values).mean(axis=0)

feature_importance = pd.DataFrame({
    "Feature": X_train.columns,
    "Impact": importance
}).sort_values(by="Impact", ascending=False)

print("\n🔍 Top 10 Factors Affecting Country Risk:")
print(feature_importance.head(10))


import pickle

# Save the trained model to a file
with open("country_risk_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model saved to country_risk_model.pkl")
# Save features for later prediction
df.to_csv("country_features.csv", index=False)
print("✅ Features saved to country_features.csv")

from fastapi import APIRouter
from services.news_service import analyze_city_news

router = APIRouter(prefix="/ai/safety", tags=["Safety"])

@router.get("/news")
def news_risk(city: str):
    data = analyze_city_news(city)

    score = min(data["risk_articles"] * 3, 100)

    if score < 30:
        level = "LOW"
    elif score < 60:
        level = "MEDIUM"
    else:
        level = "HIGH"

    return {
        "city": city,
        "risk_score": score,
        "risk_level": level,
        **data
    }

import requests
import os
from dotenv import load_dotenv

load_dotenv()
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

RISK_KEYWORDS = [
    "attack", "riot", "killed", "terror",
    "protest", "violence", "explosion"
]

def analyze_city_news(city: str):
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": city,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 100,
        "apiKey": NEWS_API_KEY
    }

    response = requests.get(url, params=params).json()
    articles = response.get("articles", [])

    risk_articles = 0
    keyword_count = {}
    main_articles = []

    for a in articles:
        text = f"{a.get('title','')} {a.get('description','')}".lower()
        is_risky = False

        for k in RISK_KEYWORDS:
            if k in text:
                keyword_count[k] = keyword_count.get(k, 0) + 1
                is_risky = True

        if is_risky:
            risk_articles += 1
            if len(main_articles) < 5:
                main_articles.append({
                    "title": a.get("title"),
                    "source": a.get("source", {}).get("name"),
                    "url": a.get("url"),
                    "published_at": a.get("publishedAt")
                })

    return {
        "total_articles": len(articles),
        "risk_articles": risk_articles,
        "top_keywords": sorted(
            keyword_count, key=keyword_count.get, reverse=True
        )[:3],
        "articles": main_articles
    }

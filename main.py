from fastapi import FastAPI
from routes.news_risk import router

app = FastAPI(title="Safety News API")
app.include_router(router)

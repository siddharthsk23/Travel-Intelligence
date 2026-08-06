from fastapi import FastAPI
from app.routes.user_routes import router as user_router
from app.db.base import Base
from app.models.user import User
from app.db.session import engine




app = FastAPI(
    title="Travel Intelligence API",
    version="0.1.0",
    description="Backend API for the Travel Intelligence platform."
)
Base.metadata.create_all(bind=engine)

app.include_router(user_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Travel Intelligence API"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Travel Intelligence API",
        "version": "0.1.0"
    }



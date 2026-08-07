from fastapi import FastAPI
from app.db.base import Base
from app.models.user import User
from app.db.session import engine
from app.routes.user_routes import router as user_router
from app.routes.destination_routes import router as destination_router
from app.routes.trip_routes import router as trip_router
from app.models.destination import Destination
from app.models.trip import Trip
from app.models.itinerary import Itinerary
from app.routes.itinerary_routes import router as itinerary_router
from app.routes.planner_routes import router as planner_router

Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="Travel Intelligence API",
    version="0.1.0",
    description="Backend API for the Travel Intelligence platform."
)
app.include_router(user_router)
app.include_router(destination_router)
app.include_router(trip_router)
app.include_router(itinerary_router)
app.include_router(planner_router)

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



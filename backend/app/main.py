from dotenv import load_dotenv

load_dotenv()

from fastapi.middleware.cors import CORSMiddleware
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
from app.routes.ai_routes import router as ai_router
from app.models.traveler_profile import TravelerProfile
from app.routes.traveler_profile_routes import router as traveler_profile_router
from app.routes.transport_routes import router as transport_router
from app.routes.destination_places_routes import router as destination_places_router
from app.routes.route_routes import router as route_router

Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="Travel Intelligence API",
    version="0.1.0",
    description="Backend API for the Travel Intelligence platform."
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(destination_router)
app.include_router(trip_router)
app.include_router(itinerary_router)
app.include_router(planner_router)
app.include_router(ai_router)
app.include_router(traveler_profile_router)
app.include_router(transport_router)
app.include_router(destination_places_router)
app.include_router(route_router)

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



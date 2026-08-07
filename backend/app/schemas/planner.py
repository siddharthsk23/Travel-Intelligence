from pydantic import BaseModel
from typing import List


class PlannerRequest(BaseModel):
    source: str
    destination: str
    days: int
    budget: float
    travel_mode: str
    interests: List[str]


class PlannerResponse(BaseModel):
    trip_name: str
    estimated_cost: float
    itinerary: List[dict]
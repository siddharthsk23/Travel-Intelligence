from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class TravelerProfileCreate(BaseModel):
    traveler_id: str

    travel_style: Optional[str] = None
    preferred_pace: Optional[str] = None

    interests: Optional[List[str]] = None
    transport_preference: Optional[str] = None
    food_preferences: Optional[List[str]] = None

    allergies: Optional[List[str]] = None
    phobias: Optional[List[str]] = None


class TravelerProfileResponse(TravelerProfileCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
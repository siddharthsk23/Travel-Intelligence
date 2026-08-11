from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.traveler_profile import TravelerProfile
from app.schemas.traveler_profile import (
    TravelerProfileCreate,
    TravelerProfileResponse,
)


router = APIRouter(
    prefix="/traveler-profile",
    tags=["Traveler Profile"]
)


@router.post(
    "",
    response_model=TravelerProfileResponse
)
def create_or_update_profile(
    profile: TravelerProfileCreate,
    db: Session = Depends(get_db),
):
    existing_profile = (
        db.query(TravelerProfile)
        .filter(
            TravelerProfile.traveler_id == profile.traveler_id
        )
        .first()
    )

    if existing_profile:

        existing_profile.travel_style = profile.travel_style
        existing_profile.preferred_pace = profile.preferred_pace
        existing_profile.interests = profile.interests
        existing_profile.transport_preference = (
            profile.transport_preference
        )
        existing_profile.food_preferences = profile.food_preferences
        existing_profile.allergies = profile.allergies
        existing_profile.phobias = profile.phobias

        db.commit()
        db.refresh(existing_profile)

        return existing_profile

    new_profile = TravelerProfile(
        traveler_id=profile.traveler_id,
        travel_style=profile.travel_style,
        preferred_pace=profile.preferred_pace,
        interests=profile.interests,
        transport_preference=profile.transport_preference,
        food_preferences=profile.food_preferences,
        allergies=profile.allergies,
        phobias=profile.phobias,
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


@router.get(
    "/{traveler_id}",
    response_model=TravelerProfileResponse
)
def get_profile(
    traveler_id: str,
    db: Session = Depends(get_db),
):
    profile = (
        db.query(TravelerProfile)
        .filter(
            TravelerProfile.traveler_id == traveler_id
        )
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Traveler profile not found"
        )

    return profile
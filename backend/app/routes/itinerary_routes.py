from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.itinerary import (
    ItineraryCreate,
    ItineraryUpdate,
    ItineraryResponse,
)

from app.repositories.itinerary_repository import (
    create_itinerary,
    get_itinerary_by_id,
    get_all_itineraries,
    update_itinerary,
    delete_itinerary,
)

router = APIRouter(
    prefix="/itineraries",
    tags=["Itineraries"],
)


@router.post("/", response_model=ItineraryResponse)
def create_new_itinerary(
    itinerary: ItineraryCreate,
    db: Session = Depends(get_db),
):
    return create_itinerary(db, itinerary)


@router.get("/", response_model=list[ItineraryResponse])
def get_itineraries(
    db: Session = Depends(get_db),
):
    return get_all_itineraries(db)


@router.get("/{itinerary_id}", response_model=ItineraryResponse)
def get_itinerary(
    itinerary_id: int,
    db: Session = Depends(get_db),
):
    itinerary = get_itinerary_by_id(db, itinerary_id)

    if not itinerary:
        raise HTTPException(
            status_code=404,
            detail="Itinerary not found",
        )

    return itinerary


@router.put("/{itinerary_id}", response_model=ItineraryResponse)
def update_existing_itinerary(
    itinerary_id: int,
    itinerary: ItineraryUpdate,
    db: Session = Depends(get_db),
):
    updated = update_itinerary(
        db,
        itinerary_id,
        itinerary,
    )

    if not updated:
        raise HTTPException(
            status_code=404,
            detail="Itinerary not found",
        )

    return updated


@router.delete("/{itinerary_id}", response_model=ItineraryResponse)
def delete_existing_itinerary(
    itinerary_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_itinerary(
        db,
        itinerary_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Itinerary not found",
        )

    return deleted
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.trip import (
    TripCreate,
    TripUpdate,
    TripResponse,
)

from app.repositories.trip_repository import (
    create_trip,
    get_trip_by_id,
    get_all_trips,
    update_trip,
    delete_trip,
)

router = APIRouter(prefix="/trips", tags=["Trips"])


@router.post("/", response_model=TripResponse)
def create_new_trip(
    trip: TripCreate,
    db: Session = Depends(get_db),
):
    return create_trip(db, trip)


@router.get("/", response_model=list[TripResponse])
def get_trips(
    db: Session = Depends(get_db),
):
    return get_all_trips(db)


@router.get("/{trip_id}", response_model=TripResponse)
def get_trip(
    trip_id: int,
    db: Session = Depends(get_db),
):
    trip = get_trip_by_id(db, trip_id)

    if not trip:
        raise HTTPException(
            status_code=404,
            detail="Trip not found",
        )

    return trip


@router.put("/{trip_id}", response_model=TripResponse)
def update_existing_trip(
    trip_id: int,
    trip: TripUpdate,
    db: Session = Depends(get_db),
):
    updated_trip = update_trip(
        db,
        trip_id,
        trip,
    )

    if not updated_trip:
        raise HTTPException(
            status_code=404,
            detail="Trip not found",
        )

    return updated_trip


@router.delete("/{trip_id}", response_model=TripResponse)
def delete_existing_trip(
    trip_id: int,
    db: Session = Depends(get_db),
):
    deleted_trip = delete_trip(
        db,
        trip_id,
    )

    if not deleted_trip:
        raise HTTPException(
            status_code=404,
            detail="Trip not found",
        )

    return deleted_trip
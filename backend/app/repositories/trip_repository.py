from sqlalchemy.orm import Session

from app.models.trip import Trip
from app.schemas.trip import TripCreate, TripUpdate


def create_trip(db: Session, trip_create: TripCreate):
    db_trip = Trip(
        user_id=trip_create.user_id,
        source=trip_create.source,
        destination=trip_create.destination,
        start_date=trip_create.start_date,
        end_date=trip_create.end_date,
        travel_mode=trip_create.travel_mode,
        budget=trip_create.budget,
    )

    db.add(db_trip)
    db.commit()
    db.refresh(db_trip)

    return db_trip


def get_trip_by_id(db: Session, trip_id: int):
    return db.query(Trip).filter(Trip.id == trip_id).first()


def get_all_trips(db: Session):
    return db.query(Trip).all()


def update_trip(
    db: Session,
    trip_id: int,
    trip_update: TripUpdate,
):
    db_trip = get_trip_by_id(db, trip_id)

    if not db_trip:
        return None

    update_data = trip_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_trip, key, value)

    db.commit()
    db.refresh(db_trip)

    return db_trip


def delete_trip(db: Session, trip_id: int):
    db_trip = get_trip_by_id(db, trip_id)

    if not db_trip:
        return None

    db.delete(db_trip)
    db.commit()

    return db_trip 
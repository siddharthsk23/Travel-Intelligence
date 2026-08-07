from sqlalchemy.orm import Session

from app.models.itinerary import Itinerary
from app.schemas.itinerary import ItineraryCreate, ItineraryUpdate


def create_itinerary(db: Session, itinerary_create: ItineraryCreate):
    db_itinerary = Itinerary(
        trip_id=itinerary_create.trip_id,
        day=itinerary_create.day,
        destination=itinerary_create.destination,
        start_time=itinerary_create.start_time,
        end_time=itinerary_create.end_time,
        activity=itinerary_create.activity,
        notes=itinerary_create.notes,
    )

    db.add(db_itinerary)
    db.commit()
    db.refresh(db_itinerary)

    return db_itinerary


def get_itinerary_by_id(db: Session, itinerary_id: int):
    return db.query(Itinerary).filter(Itinerary.id == itinerary_id).first()


def get_all_itineraries(db: Session):
    return db.query(Itinerary).all()


def update_itinerary(
    db: Session,
    itinerary_id: int,
    itinerary_update: ItineraryUpdate,
):
    db_itinerary = get_itinerary_by_id(db, itinerary_id)

    if not db_itinerary:
        return None

    update_data = itinerary_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_itinerary, key, value)

    db.commit()
    db.refresh(db_itinerary)

    return db_itinerary


def delete_itinerary(db: Session, itinerary_id: int):
    db_itinerary = get_itinerary_by_id(db, itinerary_id)

    if not db_itinerary:
        return None

    db.delete(db_itinerary)
    db.commit()

    return db_itinerary
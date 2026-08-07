from sqlalchemy.orm import Session

from app.models.destination import Destination
from app.schemas.destination import DestinationCreate, DestinationUpdate


def create_destination(
    db: Session,
    destination_create: DestinationCreate,
) -> Destination:

    db_destination = Destination(
        name=destination_create.name,
        state=destination_create.state,
        country=destination_create.country,
        latitude=destination_create.latitude,
        longitude=destination_create.longitude,
        category=destination_create.category,
        description=destination_create.description,
        best_season=destination_create.best_season,
        rating=destination_create.rating,
        image_url=destination_create.image_url,
    )

    db.add(db_destination)
    db.commit()
    db.refresh(db_destination)

    return db_destination


def get_destination_by_id(
    db: Session,
    destination_id: int,
):
    return (
        db.query(Destination)
        .filter(Destination.id == destination_id)
        .first()
    )


def get_all_destinations(db: Session):
    return db.query(Destination).all()


def update_destination(
    db: Session,
    destination_id: int,
    destination_update: DestinationUpdate,
):

    destination = get_destination_by_id(
        db,
        destination_id,
    )

    if not destination:
        return None

    update_data = destination_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(destination, key, value)

    db.commit()
    db.refresh(destination)

    return destination


def delete_destination(
    db: Session,
    destination_id: int,
):

    destination = get_destination_by_id(
        db,
        destination_id,
    )

    if not destination:
        return None

    db.delete(destination)
    db.commit()

    return destination
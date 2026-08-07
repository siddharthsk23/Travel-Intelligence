from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.destination import (
    DestinationCreate,
    DestinationUpdate,
    DestinationResponse,
)

from app.repositories.destination_repository import (
    create_destination,
    get_destination_by_id,
    get_all_destinations,
    update_destination,
    delete_destination,
)

router = APIRouter(prefix="/destinations", tags=["Destinations"])


@router.post("/",
    response_model=DestinationResponse)
def create_new_destination(
    destination: DestinationCreate,
    db: Session = Depends(get_db),
):
    return create_destination(db, destination)


@router.get("/",
    response_model=list[DestinationResponse])
def get_destinations(
    db: Session = Depends(get_db),
):
    return get_all_destinations(db)


@router.get("/{destination_id}",
    response_model=DestinationResponse)
def get_destination(
    destination_id: int,
    db: Session = Depends(get_db),
):
    destination = get_destination_by_id(db, destination_id)

    if not destination:
        raise HTTPException(
            status_code=404,
            detail="Destination not found",
        )

    return destination


@router.put("/{destination_id}",
    response_model=DestinationResponse)
def update_existing_destination(
    destination_id: int,
    destination: DestinationUpdate,
    db: Session = Depends(get_db),
):
    updated_destination = update_destination(
        db,
        destination_id,
        destination,
    )

    if not updated_destination:
        raise HTTPException(
            status_code=404,
            detail="Destination not found",
        )

    return updated_destination


@router.delete("/{destination_id}",
    response_model=DestinationResponse)
def delete_existing_destination(
    destination_id: int,
    db: Session = Depends(get_db),
):
    deleted_destination = delete_destination(
        db,
        destination_id,
    )

    if not deleted_destination:
        raise HTTPException(
            status_code=404,
            detail="Destination not found",
        )

    return deleted_destination
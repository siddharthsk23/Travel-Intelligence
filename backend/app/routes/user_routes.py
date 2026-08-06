from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.repositories.user_repository import (
    create_user,
    get_by_email,
    get_by_username,
)

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    if get_by_username(db, user.username):
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    if get_by_email(db, user.email):
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return create_user(db, user)
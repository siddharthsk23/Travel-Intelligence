from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.security import create_access_token
from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin

from app.repositories.user_repository import (
    create_user,
    get_by_email,
    get_by_username,
    authenticate_user,
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

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    authenticated_user = authenticate_user(
        db,
        user.username,
        user.password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    access_token = create_access_token(
        {"sub": authenticated_user.username}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
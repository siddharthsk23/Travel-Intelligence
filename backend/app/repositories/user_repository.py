from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import hash_password

def create_user(db: Session, user_create: UserCreate) -> User:
    db_user = User(
        username=user_create.username,
        email=user_create.email,
        hashed_password = hash_password(user_create.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()

def get_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()
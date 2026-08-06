# backend/app/schemas/user.py

from pydantic import BaseModel, EmailStr, ConfigDict

class UserBase(BaseModel):
    username: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
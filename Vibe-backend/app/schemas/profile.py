from pydantic import BaseModel

class ProfileCreate(BaseModel):
    name: str
    age: int
    school: str
    bio: str | None = None
    profile_picture_url: str | None = None
    social_preferences: str | None = None
    looking_for: str | None = None

class ProfileResponse(BaseModel):
    id: int
    user_id: int
    name: str
    age: int
    school: str
    bio: str | None = None
    profile_picture_url: str | None = None
    social_preferences: str | None = None
    looking_for: str | None = None

    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    name: str
    age: int
    school: str
    bio: str | None = None
    profile_picture_url: str | None = None
    social_preferences: str | None = None
    looking_for: str | None = None
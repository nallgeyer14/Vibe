from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import User, Profile
from app.schemas.profile import ProfileCreate, ProfileResponse, ProfileUpdate

router = APIRouter(prefix="/profiles", tags=["Profiles"])
@router.put("/me", response_model=ProfileResponse)
def update_my_profile(
    profile_data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    profile.name = profile_data.name
    profile.age = profile_data.age
    profile.school = profile_data.school
    profile.bio = profile_data.bio
    profile.profile_picture_url = profile_data.profile_picture_url
    profile.social_preferences = profile_data.social_preferences
    profile.looking_for = profile_data.looking_for

    db.commit()
    db.refresh(profile)

    return profile

@router.get("/me", response_model=ProfileResponse)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    return profile

@router.post("/", response_model=ProfileResponse)
def create_profile(
    profile_data: ProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    existing_profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)      
        .first()
    )
    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists for this user",
        )
    
    profile = Profile(
        user_id=current_user.id,
        name=profile_data.name,
        age=profile_data.age,
        school=profile_data.school,
        bio=profile_data.bio,
        profile_picture_url=profile_data.profile_picture_url,
        social_preferences=profile_data.social_preferences,
        looking_for=profile_data.looking_for,
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import User, UserSettings
from app.schemas.settings import SettingsResponse, SettingsUpdate

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("/me", response_model=SettingsResponse)
def get_my_settings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    settings = (
        db.query(UserSettings)
        .filter(UserSettings.user_id == current_user.id)
        .first()
    )

    if not settings:
        settings = UserSettings(user_id=current_user.id)
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


@router.put("/me", response_model=SettingsResponse)
def update_my_settings(
    settings_data: SettingsUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    settings = (
        db.query(UserSettings)
        .filter(UserSettings.user_id == current_user.id)
        .first()
    )

    if not settings:
        settings = UserSettings(user_id=current_user.id)
        db.add(settings)

    settings.location_enabled = settings_data.location_enabled
    settings.show_interests = settings_data.show_interests
    settings.private_profile = settings_data.private_profile
    settings.new_matches_notifications = settings_data.new_matches_notifications
    settings.message_notifications = settings_data.message_notifications
    settings.activity_updates_notifications = settings_data.activity_updates_notifications
    settings.nearby_activities_notifications = settings_data.nearby_activities_notifications

    db.commit()
    db.refresh(settings)

    return settings
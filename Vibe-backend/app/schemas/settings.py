from pydantic import BaseModel


class SettingsResponse(BaseModel):
    id: int
    user_id: int

    location_enabled: bool
    show_interests: bool
    private_profile: bool

    new_matches_notifications: bool
    message_notifications: bool
    activity_updates_notifications: bool
    nearby_activities_notifications: bool

    class Config:
        from_attributes = True


class SettingsUpdate(BaseModel):
    location_enabled: bool
    show_interests: bool
    private_profile: bool

    new_matches_notifications: bool
    message_notifications: bool
    activity_updates_notifications: bool
    nearby_activities_notifications: bool
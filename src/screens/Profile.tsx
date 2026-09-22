import React, { useEffect, useState } from 'react';
import {
  getMyProfile,
  getUserInterests,
  type Interest,
  type ProfilePayload,
} from '../services/api';
import { interests as interestData } from '../data';

interface ProfileProps {
  onSettings: () => void;
  onEditProfile: () => void;
}

interface ProfileData extends ProfilePayload {
  id: number;
  user_id: number;
}

export default function Profile({
  onSettings,
  onEditProfile,
}: ProfileProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [userInterests, setUserInterests] = useState<Interest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('vibe_token');

        if (!token) {
          setError('You are not logged in.');
          return;
        }

        const [profileData, interestsData] = await Promise.all([
          getMyProfile(token),
          getUserInterests(token),
        ]);

        setProfile(profileData);
        setUserInterests(interestsData);
      } catch (err) {
        console.error('Failed to load profile:', err);

        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load your profile.'
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
          color: 'var(--text-muted)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Loading your profile...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
          color: 'var(--text)',
          padding: 24,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>

        <h2 style={{ margin: '0 0 8px' }}>
          Couldn't load your profile
        </h2>

        <p
          style={{
            color: 'var(--text-muted)',
            margin: 0,
          }}
        >
          {error || 'Your profile could not be found.'}
        </p>
      </div>
    );
  }

  const initials = profile.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      <div
        className="scroll-y"
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: 90,
        }}
      >
        {/* Header */}
        <div
          style={{
            height: 160,
            background:
              'linear-gradient(145deg, rgba(61, 111, 168, 0.3) 0%, rgba(251, 193, 161, 0.15) 100%)',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 30% 50%, rgba(61, 111, 168, .1) 0%, transparent 60%)',
            }}
          />

          {/* Settings button */}
          <button
            onClick={onSettings}
            style={{
              position: 'absolute',
              top: 56,
              right: 20,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              padding: '10px 14px',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: 15,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            ⚙️
          </button>
        </div>

        {/* Profile info */}
        <div
          style={{
            padding: '0 24px',
            position: 'relative',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              marginTop: -52,
              marginBottom: 16,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <div
              style={{
                width: 104,
                height: 104,
                borderRadius: '50%',
                padding: 3,
                background: 'var(--gradient)',
              }}
            >
              {profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt={profile.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(145deg, rgba(109,40,217,0.8), rgba(255,122,48,0.8))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 32,
                    fontWeight: 800,
                  }}
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          {/* Name / School / Bio */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 4,
              }}
            >
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: 'var(--text)',
                  margin: 0,
                  letterSpacing: -0.5,
                }}
              >
                {profile.name}, {profile.age}
              </h1>
            </div>

            <div
              style={{
                color: 'var(--text-muted)',
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              {profile.school}
            </div>

            {profile.bio && (
              <p
                style={{
                  color: 'var(--text)',
                  fontSize: 15,
                  lineHeight: 1.6,
                  margin: '0 0 16px',
                }}
              >
                {profile.bio}
              </p>
            )}

            <button
              onClick={onEditProfile}
              style={{
                background: 'var(--card-el)',
                border: '1px solid rgba(61, 111, 168,0.25)',
                borderRadius: 14,
                padding: '11px 22px',
                color: 'var(--text)',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
              >
              ✏️ Edit Profile
            </button>
           </div>

          {/* Social Style */}
          {(profile.social_preferences || profile.looking_for) && (
            <div
              style={{
                background: 'var(--card)',
                borderRadius: 18,
                padding: '16px 18px',
                marginBottom: 24,
                border: '1px solid rgba(61, 111, 168,0.25)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  marginBottom: 10,
                }}
              >
                Social Style
              </div>

              {profile.social_preferences && (
                <div
                  style={{
                    color: 'var(--text)',
                    fontSize: 15,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  ✨ {profile.social_preferences}
                </div>
              )}

              {profile.looking_for && (
                <div
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 13,
                  }}
                >
                  Looking for: {profile.looking_for}
                </div>
              )}
            </div>
          )}

          {/* Interests */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                Interests
              </h3>

              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--main-bright)',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                }}
              >
                Edit
              </button>
            </div>

            {userInterests.length > 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                {userInterests.map(interest => {
                  const item = interestData.find(
                    i => i.label === interest.name
                  );

                  return (
                    <span
                      key={interest.id}
                      style={{
                        background: 'var(--gradient)',
                        borderRadius: 100,
                        padding: '7px 16px',
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      {item?.emoji} {interest.name}
                    </span>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  color: 'var(--text-muted)',
                  fontSize: 14,
                }}
              >
                No interests selected yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
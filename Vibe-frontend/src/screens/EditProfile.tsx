import React, { useEffect, useState } from 'react';
import {
  getMyProfile,
  getInterests,
  getUserInterests,
  setUserInterests,
  updateProfile,
  type Interest,
  type ProfilePayload,
} from '../services/api';
import { interests as interestData } from '../data';

interface EditProfileProps {
  onBack: () => void;
  onSaved: () => void;
}

export default function EditProfile({
  onBack,
  onSaved,
}: EditProfileProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [bio, setBio] = useState('');
  const [socialPref, setSocialPref] = useState('');
  const [friendPref, setFriendPref] = useState('');

  const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<Set<number>>(
    new Set()
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const socialOptions = [
    {
      label: 'Introvert',
      sub: 'Prefer small groups & deep convos',
      icon: '🌙',
    },
    {
      label: 'Ambivert',
      sub: 'Good in both big and small settings',
      icon: '✨',
    },
    {
      label: 'Extrovert',
      sub: 'Love big energy and meeting everyone',
      icon: '🔥',
    },
  ];

  const friendOptions = [
    {
      label: 'Activity partners',
      sub: 'Hiking, gym, sports, and more',
      icon: '🏅',
    },
    {
      label: 'Genuine friendships',
      sub: 'Looking for life-long friendships',
      icon: '🤝',
    },
    {
      label: 'Study buddies',
      sub: 'School, work, or personal projects',
      icon: '📚',
    },
    {
      label: 'Gaming crew',
      sub: 'Console, PC, or mobile gaming',
      icon: '🎮',
    },
    {
      label: 'All of the above',
      sub: 'I’m open to meeting all kinds of friends',
      icon: '👐',
    },
  ];

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('vibe_token');

        if (!token) {
          setError('You are not logged in.');
          return;
        }

        const [profile, allInterests, currentInterests] =
          await Promise.all([
            getMyProfile(token),
            getInterests(),
            getUserInterests(token),
          ]);

        setName(profile.name);
        setAge(String(profile.age));
        setSchool(profile.school);
        setBio(profile.bio ?? '');
        setSocialPref(profile.social_preferences ?? '');
        setFriendPref(profile.looking_for ?? '');

        setAvailableInterests(allInterests);

        setSelectedInterests(
          new Set(currentInterests.map(interest => interest.id))
        );
      } catch (err) {
        console.error('Failed to load edit profile:', err);

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

  const toggleInterest = (interestId: number) => {
    setSelectedInterests(prev => {
      const next = new Set(prev);

      if (next.has(interestId)) {
        next.delete(interestId);
      } else {
        next.add(interestId);
      }

      return next;
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('vibe_token');

      if (!token) {
        alert('You are not logged in.');
        return;
      }

      if (!name.trim()) {
        alert('Please enter your name.');
        return;
      }

      if (!age || Number(age) < 13) {
        alert('Please enter a valid age.');
        return;
      }

      if (!school.trim()) {
        alert('Please enter your school or work.');
        return;
      }

      if (selectedInterests.size < 3) {
        alert('Please select at least 3 interests.');
        return;
      }

      setIsSaving(true);

      const currentProfile = await getMyProfile(token);

      const profilePayload: ProfilePayload = {
        name: name.trim(),
        age: Number(age),
        school: school.trim(),
        bio: bio.trim(),
        profile_picture_url:
          currentProfile.profile_picture_url ?? undefined,
        social_preferences: socialPref,
        looking_for: friendPref,
      };

      await updateProfile(token, profilePayload);

      await setUserInterests(
        token,
        Array.from(selectedInterests)
      );

      onSaved();
    } catch (err) {
      console.error('Profile save failed:', err);

      alert(
        err instanceof Error
          ? err.message
          : 'Failed to save your profile.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="screen"
        style={{
          background: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
        }}
      >
        Loading your profile...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="screen"
        style={{
          background: 'var(--bg)',
          padding: '56px 24px 40px',
          color: 'var(--text)',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'var(--card-el)',
            border: '1px solid rgba(61, 111, 168, 1)',
            borderRadius: 12,
            padding: '10px 14px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            marginBottom: 24,
          }}
        >
          ←
        </button>

        <h1 style={{ fontSize: 24, margin: '0 0 8px' }}>
          Couldn't load your profile
        </h1>

        <p style={{ color: 'var(--text-muted)' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className="screen"
      style={{
        background: 'var(--bg)',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '56px 24px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          disabled={isSaving}
          style={{
            background: 'var(--card-el)',
            border: '1px solid rgba(61, 111, 168, 1)',
            borderRadius: 12,
            padding: '10px 14px',
            color: 'var(--text-muted)',
            cursor: isSaving ? 'default' : 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
          }}
        >
          ←
        </button>

        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--text)',
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          Edit Profile
        </h1>
      </div>

      <div
        className="scroll-y"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 24px 40px',
        }}
      >
        {/* Basic Information */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 10,
              paddingLeft: 4,
            }}
          >
            Basic Information
          </div>

          <div
            style={{
              background: 'var(--card)',
              borderRadius: 20,
              padding: 18,
              border: '1px solid rgba(61, 111, 168, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  color: 'var(--text-muted)',
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Name
              </label>

              <input
                className="vibe-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  color: 'var(--text-muted)',
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Age
              </label>

              <input
                className="vibe-input"
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="Your age"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  color: 'var(--text-muted)',
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                School / Work
              </label>

              <input
                className="vibe-input"
                value={school}
                onChange={e => setSchool(e.target.value)}
                placeholder="e.g. Computer Science @ WIU"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  color: 'var(--text-muted)',
                  fontSize: 12,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Bio
              </label>

              <textarea
                className="vibe-input"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell people a little about yourself..."
                rows={5}
                maxLength={150}
                style={{
                  resize: 'none',
                  lineHeight: 1.6,
                }}
              />

              <div
                style={{
                  textAlign: 'right',
                  marginTop: 6,
                  color: 'var(--text-muted)',
                  fontSize: 12,
                }}
              >
                {bio.length}/150
              </div>
            </div>
          </div>
        </div>

        {/* Social Style */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 10,
              paddingLeft: 4,
            }}
          >
            Social Style
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {socialOptions.map(option => {
              const selected = socialPref === option.label;

              return (
                <button
                  key={option.label}
                  onClick={() => setSocialPref(option.label)}
                  style={{
                    background: selected
                      ? 'rgba(61, 111, 168,0.2)'
                      : 'var(--card)',
                    border: `1.5px solid ${
                      selected
                        ? 'var(--main-bright)'
                        : 'rgba(61, 111, 168, 1)'
                    }`,
                    borderRadius: 18,
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <span style={{ fontSize: 28 }}>
                    {option.icon}
                  </span>

                  <div>
                    <div
                      style={{
                        color: 'var(--text)',
                        fontSize: 17,
                        fontWeight: 700,
                        marginBottom: 3,
                      }}
                    >
                      {option.label}
                    </div>

                    <div
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: 13,
                      }}
                    >
                      {option.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Looking For */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 10,
              paddingLeft: 4,
            }}
          >
            Looking For
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {friendOptions.map(option => {
              const selected = friendPref === option.label;

              return (
                <button
                  key={option.label}
                  onClick={() => setFriendPref(option.label)}
                  style={{
                    background: selected
                      ? 'rgba(61, 111, 168,0.25)'
                      : 'var(--card)',
                    border: `1.5px solid ${
                      selected
                        ? 'var(--main-bright)'
                        : 'rgba(61, 111, 168, 1)'
                    }`,
                    borderRadius: 18,
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <span style={{ fontSize: 28 }}>
                    {option.icon}
                  </span>

                  <div>
                    <div
                      style={{
                        color: 'var(--text)',
                        fontSize: 17,
                        fontWeight: 700,
                        marginBottom: 3,
                      }}
                    >
                      {option.label}
                    </div>

                    <div
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: 13,
                      }}
                    >
                      {option.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interests */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-muted)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              marginBottom: 10,
              paddingLeft: 4,
            }}
          >
            Interests
          </div>

          <div
            style={{
              background: 'var(--card)',
              borderRadius: 20,
              padding: 18,
              border: '1px solid rgba(61, 111, 168,1)',
            }}
          >
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: 13,
                margin: '0 0 14px',
              }}
            >
              Pick at least 3.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
              }}
            >
              {availableInterests.map(interest => {
                const selected = selectedInterests.has(interest.id);

                const item = interestData.find(
                  i => i.label === interest.name
                );

                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    style={{
                      background: selected
                        ? 'var(--gradient)'
                        : 'rgba(255,255,255,0.03)',
                      border: selected
                        ? 'none'
                        : '1px solid rgba(61, 111, 168,0.25)',
                      borderRadius: 14,
                      padding: '12px 8px',
                      color: selected
                        ? 'white'
                        : 'var(--text-muted)',
                      fontSize: 13,
                      fontWeight: selected ? 700 : 500,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {item?.emoji} {interest.name}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                textAlign: 'center',
                marginTop: 14,
                color: 'var(--text-muted)',
                fontSize: 12,
              }}
            >
              {selectedInterests.size} selected
            </div>
          </div>
        </div>

        {/* Save */}
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={isSaving}
          style={{
            width: '100%',
            fontSize: 17,
            opacity: isSaving ? 0.6 : 1,
          }}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>

        <button
          onClick={onBack}
          disabled={isSaving}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: 14,
            cursor: isSaving ? 'default' : 'pointer',
            fontFamily: 'Inter, sans-serif',
            padding: '16px 8px',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Profile, myProfile } from '../data';

interface MatchProps {
  profile: Profile;
  onChat: () => void;
  onKeepSwiping: () => void;
}

export default function Match({
  profile,
  onChat,
  onKeepSwiping,
}: MatchProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const sharedInterests = profile.interests.slice(0, 3);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 28px',
        zIndex: 100,
        background: 'rgba(244, 241, 232, 0.98)',
      }}
    >
      {/* Soft background accent */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 280,
          height: 280,
          background:
            'radial-gradient(circle, rgba(91,143,197,0.14) 0%, rgba(232,117,97,0.08) 45%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'scale(1) translateY(0)'
            : 'scale(0.92) translateY(15px)',
          transition:
            'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          textAlign: 'center',
          marginBottom: 30,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          ✨ You connected!
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: -1.5,
            lineHeight: 1,
            color: 'var(--violet)',
          }}
        >
          It's a Vibe
        </div>
      </div>

      {/* Profile photos */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 28,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(25px)',
          transition:
            'all 0.5s 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid white',
            background: 'var(--main-bright)',
            padding: 2,
            marginRight: -18,
            zIndex: 2,
            boxShadow: '0 8px 24px rgba(31, 41, 51, 0.15)',
          }}
        >
          <img
            src={myProfile.photo}
            alt={myProfile.name}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>

        <div
          style={{
            width: 108,
            height: 108,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid white',
            background: 'var(--orange)',
            padding: 2,
            zIndex: 1,
            boxShadow: '0 8px 24px rgba(31, 41, 51, 0.15)',
          }}
        >
          <img
            src={profile.photo}
            alt={profile.name}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>

      {/* Names */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 22,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s 0.25s',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 21,
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: 5,
          }}
        >
          {myProfile.name} & {profile.name}
        </div>

        <div
          style={{
            color: 'var(--text-muted)',
            fontSize: 14,
          }}
        >
          You have some things in common
        </div>
      </div>

      {/* Shared interests */}
      <div
        style={{
          background: 'white',
          borderRadius: 20,
          padding: '18px 22px',
          width: '100%',
          marginBottom: 26,
          border: '1px solid rgba(61, 111, 168, 0.12)',
          boxShadow: '0 8px 24px rgba(31, 41, 51, 0.06)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s 0.3s',
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: 'var(--violet)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            marginBottom: 12,
          }}
        >
          You both like
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {sharedInterests.map(tag => (
            <span
              key={tag}
              style={{
                background: '#E8EDF1',
                border: '1px solid rgba(61, 111, 168, 0.12)',
                borderRadius: 100,
                padding: '7px 14px',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s 0.4s',
          zIndex: 1,
        }}
      >
        <button
          className="btn-primary"
          onClick={onChat}
          style={{
            fontSize: 16,
          }}
        >
          Say Hello 👋
        </button>

        <button
          onClick={onKeepSwiping}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            padding: '11px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Keep Exploring
        </button>
      </div>
    </div>
  );
}
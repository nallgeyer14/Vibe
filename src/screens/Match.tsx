import React, { useEffect, useState } from 'react';
import { Profile, myProfile } from '../data';

interface MatchProps {
  profile: Profile;
  onChat: () => void;
  onKeepSwiping: () => void;
}

export default function Match({ profile, onChat, onKeepSwiping }: MatchProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const sharedInterests = profile.interests.slice(0, 3);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 28px',
      zIndex: 100,
      background: 'rgba(11, 9, 16, 0.96)',
      backdropFilter: 'blur(20px)',
    }}>
      {/* Ambient glows */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(255,122,48,0.15) 50%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {/* IT'S A VIBE */}
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        textAlign: 'center',
        marginBottom: 36,
      }}>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          ✨ You connected!
        </div>
        <div className="vg-text" style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1 }}>
          It's a Vibe
        </div>
      </div>

      {/* Profile photos */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 32,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.5s 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}>
        <div style={{
          width: 110,
          height: 110,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid transparent',
          background: 'var(--gradient)',
          padding: 3,
          marginRight: -20,
          zIndex: 2,
        }}>
          <img
            src={myProfile.photo}
            alt={myProfile.name}
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
        <div style={{
          width: 110,
          height: 110,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid transparent',
          background: 'var(--gradient)',
          padding: 3,
          zIndex: 1,
        }}>
          <img
            src={profile.photo}
            alt={profile.name}
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Names */}
      <div style={{
        textAlign: 'center',
        marginBottom: 24,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s 0.25s',
      }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
          {myProfile.name} & {profile.name}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          {profile.match}% compatibility match
        </div>
      </div>

      {/* Shared interests */}
      <div style={{
        background: 'var(--card)',
        borderRadius: 20,
        padding: '18px 22px',
        width: '100%',
        marginBottom: 28,
        border: '1px solid rgba(139,92,246,0.2)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s 0.3s',
      }}>
        <div style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 }}>
          You both like
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {sharedInterests.map(tag => (
            <span key={tag} style={{
              background: 'var(--gradient)',
              borderRadius: 100,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              color: 'white',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s 0.4s',
      }}>
        <button className="btn-primary" onClick={onChat} style={{ fontSize: 17 }}>
          Say Hello 👋
        </button>
        <button
          onClick={onKeepSwiping}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: 15,
            cursor: 'pointer',
            padding: '12px',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Keep Swiping
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { myProfile, interests } from '../data';

interface ProfileProps {
  onSettings: () => void;
}

const myInterests = interests.slice(0, 6);
const myActivities = [
  { emoji: '🏀', title: 'Pickup Basketball', date: 'Tonight 7:00 PM', joined: true },
  { emoji: '☕', title: 'Coffee & Study', date: 'Tomorrow 2:00 PM', joined: true },
];

export default function Profile({ onSettings }: ProfileProps) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        {/* Header */}
        <div style={{
          height: 160,
          background: 'linear-gradient(145deg, rgba(109,40,217,0.3) 0%, rgba(255,122,48,0.15) 100%)',
          position: 'relative',
          flexShrink: 0,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(139,92,246,0.25) 0%, transparent 60%)',
          }} />

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
        <div style={{ padding: '0 24px', position: 'relative' }}>
          {/* Avatar */}
          <div style={{ marginTop: -52, marginBottom: 16, position: 'relative', display: 'inline-block' }}>
            <div style={{
              width: 104,
              height: 104,
              borderRadius: '50%',
              padding: 3,
              background: 'var(--gradient)',
            }}>
              <img
                src={myProfile.photo}
                alt={myProfile.name}
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: 'var(--text)', margin: 0, letterSpacing: -0.5 }}>
                {myProfile.name}, {myProfile.age}
              </h1>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 10 }}>{myProfile.school}</div>
            <p style={{ color: 'var(--text)', fontSize: 15, lineHeight: 1.6, margin: '0 0 16px' }}>
              {myProfile.bio}
            </p>

            <button
              style={{
                background: 'var(--card-el)',
                border: '1px solid rgba(139,92,246,0.25)',
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

          {/* Social pref */}
          <div style={{
            background: 'var(--card)',
            borderRadius: 18,
            padding: '16px 18px',
            marginBottom: 24,
            border: '1px solid rgba(139,92,246,0.12)',
          }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>
              Social Style
            </div>
            <div style={{ color: 'var(--text)', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>✨ {myProfile.socialPref}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Looking for: {myProfile.lookingFor}</div>
          </div>

          {/* Interests */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: 0 }}>Interests</h3>
              <button style={{
                background: 'none', border: 'none', color: 'var(--violet-bright)', cursor: 'pointer',
                fontSize: 14, fontFamily: 'Inter, sans-serif', fontWeight: 600,
              }}>Edit</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {myProfile.interests.map(interest => {
                const item = interests.find(i => i.label === interest);
                return (
                  <span key={interest} style={{
                    background: 'var(--gradient)',
                    borderRadius: 100,
                    padding: '7px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    {item?.emoji} {interest}
                  </span>
                );
              })}
            </div>
          </div>

          {/* My Activities */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', margin: '0 0 14px' }}>
              My Activities
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {myActivities.map(a => (
                <div key={a.title} style={{
                  background: 'var(--card)',
                  borderRadius: 16,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  border: '1px solid rgba(139,92,246,0.12)',
                }}>
                  <span style={{ fontSize: 24 }}>{a.emoji}</span>
                  <div>
                    <div style={{ color: 'var(--text)', fontSize: 15, fontWeight: 600 }}>{a.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{a.date}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span style={{
                      background: 'rgba(74, 222, 128, 0.15)',
                      border: '1px solid rgba(74, 222, 128, 0.3)',
                      borderRadius: 100,
                      padding: '4px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#4ADE80',
                    }}>
                      Joined
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: 16,
          }}>
            {[
              { label: 'Vibes', value: '24' },
              { label: 'Activities', value: '7' },
              { label: 'Friends', value: '12' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'var(--card)',
                borderRadius: 16,
                padding: '16px 12px',
                textAlign: 'center',
                border: '1px solid rgba(139,92,246,0.1)',
              }}>
                <div className="vg-text" style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

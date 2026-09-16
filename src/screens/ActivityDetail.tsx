import React, { useState } from 'react';
import { activities } from '../data';

interface ActivityDetailProps {
  activityId: number;
  onBack: () => void;
  onChat: () => void;
}

const participants = [
  { photo: 'https://i.pravatar.cc/100?img=11', name: 'Alex' },
  { photo: 'https://i.pravatar.cc/100?img=47', name: 'Maya' },
  { photo: 'https://i.pravatar.cc/100?img=33', name: 'Darius' },
  { photo: 'https://i.pravatar.cc/100?img=60', name: 'Priya' },
];

export default function ActivityDetail({ activityId, onBack, onChat }: ActivityDetailProps) {
  const activity = activities.find(a => a.id === activityId) ?? activities[0];
  const [joined, setJoined] = useState(false);
  const spotsLeft = activity.max - activity.joined - (joined ? 1 : 0);

  return (
    <div className="screen scroll-y" style={{ background: 'var(--bg)' }}>
      {/* Header image area */}
      <div style={{
        height: 220,
        background: `linear-gradient(145deg, ${activity.color}40, ${activity.color}15)`,
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontSize: 80 }}>{activity.emoji}</span>

        {/* Back */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 56,
            left: 20,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '10px 16px',
            color: 'white',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ← Back
        </button>

        {/* Category badge */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          right: 20,
          background: `${activity.color}30`,
          border: `1.5px solid ${activity.color}60`,
          borderRadius: 100,
          padding: '6px 16px',
          fontSize: 13,
          fontWeight: 700,
          color: activity.color,
        }}>
          {activity.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 24px 120px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', margin: '0 0 8px', letterSpacing: -0.5 }}>
          {activity.title}
        </h1>

        {/* Meta info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            { icon: '📅', text: `${activity.date} • ${activity.time}` },
            { icon: '📍', text: activity.location },
            { icon: '👥', text: `${activity.joined + (joined ? 1 : 0)} / ${activity.max} people joined` },
          ].map(item => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 15 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Spots bar */}
        <div style={{ background: 'var(--card)', borderRadius: 16, padding: '16px 18px', marginBottom: 20, border: '1px solid rgba(139,92,246,0.12)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Spots remaining</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: spotsLeft <= 2 ? 'var(--orange)' : 'var(--violet-bright)' }}>
              {spotsLeft} of {activity.max}
            </span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 100 }}>
            <div style={{
              width: `${((activity.joined + (joined ? 1 : 0)) / activity.max) * 100}%`,
              height: '100%',
              borderRadius: 100,
              background: activity.color,
            }} />
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 10px' }}>About</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            {activity.description}
          </p>
        </div>

        {/* Creator */}
        <div style={{ background: 'var(--card)', borderRadius: 18, padding: '14px 18px', marginBottom: 24, border: '1px solid rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={activity.creatorPhoto} alt={activity.creator} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Organized by</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{activity.creator}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 100,
              padding: '5px 12px',
              fontSize: 12,
              color: 'var(--violet-bright)',
              fontWeight: 600,
            }}>
              Message
            </span>
          </div>
        </div>

        {/* Participants */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '0 0 14px' }}>
            Who's going ({activity.joined})
          </h3>
          <div style={{ display: 'flex', gap: -8 }}>
            {participants.slice(0, activity.joined).map((p, i) => (
              <img
                key={p.name}
                src={p.photo}
                alt={p.name}
                title={p.name}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--bg)',
                  marginLeft: i === 0 ? 0 : -10,
                }}
              />
            ))}
            {activity.joined > 4 && (
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--card-el)',
                border: '2px solid var(--bg)',
                marginLeft: -10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--text-muted)',
              }}>
                +{activity.joined - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed bottom buttons */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px 36px',
        background: 'rgba(11,9,16,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(139,92,246,0.1)',
        display: 'flex',
        gap: 12,
      }}>
        {joined ? (
          <>
            <button
              className="btn-secondary"
              onClick={() => setJoined(false)}
              style={{ flex: 1 }}
            >
              Leave
            </button>
            <button
              className="btn-primary"
              onClick={onChat}
              style={{ flex: 2 }}
            >
              Activity Chat 💬
            </button>
          </>
        ) : (
          <button
            className="btn-primary"
            onClick={() => setJoined(true)}
            style={{ fontSize: 17 }}
            disabled={spotsLeft <= 0}
          >
            {spotsLeft <= 0 ? 'Activity Full' : `Join Activity — ${spotsLeft} spots left`}
          </button>
        )}
      </div>
    </div>
  );
}

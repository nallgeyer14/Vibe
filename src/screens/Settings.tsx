import React, { useState } from 'react';

interface SettingsProps {
  onBack: () => void;
}

const sections = [
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Edit Profile' },
      { icon: '📱', label: 'Phone Number' },
      { icon: '📧', label: 'Email Address' },
      { icon: '🔑', label: 'Change Password' },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { icon: '📍', label: 'Location Settings', toggle: true, on: true },
      { icon: '👁️', label: 'Show My Interests', toggle: true, on: true },
      { icon: '🔒', label: 'Private Profile', toggle: false, on: false },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { icon: '🔔', label: 'New Matches', toggle: true, on: true },
      { icon: '💬', label: 'Messages', toggle: true, on: true },
      { icon: '📅', label: 'Activity Updates', toggle: true, on: true },
      { icon: '🎯', label: 'Nearby Activities', toggle: false, on: false },
    ],
  },
  {
    title: 'Safety',
    items: [
      { icon: '🚫', label: 'Blocked Users' },
      { icon: '🚩', label: 'Report a Problem' },
      { icon: '🛡️', label: 'Safety Center' },
    ],
  },
  {
    title: 'More',
    items: [
      { icon: '⭐', label: 'Rate Vibe' },
      { icon: '💌', label: 'Invite Friends' },
      { icon: '📋', label: 'Terms of Service' },
      { icon: '🔐', label: 'Privacy Policy' },
    ],
  },
];

export default function Settings({ onBack }: SettingsProps) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Location Settings': true,
    'Show My Interests': true,
    'Private Profile': false,
    'New Matches': true,
    'Messages': true,
    'Activity Updates': true,
    'Nearby Activities': false,
  });

  const toggle = (label: string) => {
    setToggles(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 20px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--card-el)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 12,
            padding: '10px 14px',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
          }}
        >
          ←
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', margin: 0, letterSpacing: -0.5 }}>
          Settings
        </h1>
      </div>

      <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 40px' }}>
        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, paddingLeft: 4 }}>
              {section.title}
            </div>
            <div style={{ background: 'var(--card)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(139,92,246,0.1)' }}>
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 18px',
                    borderBottom: i < section.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => 'toggle' in item && toggle(item.label)}
                >
                  <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
                  <span style={{ flex: 1, color: 'var(--text)', fontSize: 15, fontWeight: 500 }}>{item.label}</span>
                  {'toggle' in item ? (
                    <div
                      style={{
                        width: 48,
                        height: 28,
                        borderRadius: 100,
                        background: toggles[item.label] ? 'var(--gradient)' : 'rgba(255,255,255,0.1)',
                        position: 'relative',
                        transition: 'background 0.2s',
                        flexShrink: 0,
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 3,
                        left: toggles[item.label] ? 23 : 3,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'white',
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }} />
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: 16 }}>›</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger zone */}
        <div>
          <button
            style={{
              width: '100%',
              background: 'rgba(248, 113, 113, 0.08)',
              border: '1px solid rgba(248, 113, 113, 0.2)',
              borderRadius: 16,
              padding: '16px',
              color: '#F87171',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              marginBottom: 12,
            }}
          >
            Log Out
          </button>
          <button
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'rgba(248, 113, 113, 0.5)',
              fontSize: 13,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              padding: '8px',
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

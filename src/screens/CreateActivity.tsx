import React, { useState } from 'react';

interface CreateActivityProps {
  onBack: () => void;
  onPost: () => void;
}

const categoryOptions = [
  { label: 'Sports', emoji: '⚽' },
  { label: 'Social', emoji: '☕' },
  { label: 'Gaming', emoji: '🎮' },
  { label: 'Outdoors', emoji: '🥾' },
  { label: 'Music', emoji: '🎵' },
  { label: 'Cars', emoji: '🚗' },
  { label: 'Food', emoji: '🍜' },
  { label: 'Other', emoji: '✨' },
];

const visibilityOptions = [
  { label: 'Anyone', sub: 'Open to everyone on Vibe', icon: '🌎' },
  { label: 'Friends', sub: 'Only your Vibes', icon: '👥' },
  { label: 'Matches', sub: 'Only compatible matches', icon: '✨' },
];

export default function CreateActivity({ onBack, onPost }: CreateActivityProps) {
  const [category, setCategory] = useState('');
  const [what, setWhat] = useState('');
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');
  const [count, setCount] = useState('4');
  const [desc, setDesc] = useState('');
  const [visibility, setVisibility] = useState('Anyone');

  const canPost = what && when && where && category;

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
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
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', margin: 0, letterSpacing: -0.5 }}>
            Create Activity
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '2px 0 0' }}>
            Let people know what you're up to
          </p>
        </div>
      </div>

      <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 20px' }}>
        {/* Category */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
            Category
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {categoryOptions.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => setCategory(label)}
                style={{
                  background: category === label ? 'var(--gradient)' : 'var(--card)',
                  border: category === label ? 'none' : '1px solid rgba(139,92,246,0.15)',
                  borderRadius: 14,
                  padding: '12px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                  boxShadow: category === label ? '0 4px 16px rgba(139,92,246,0.3)' : 'none',
                }}
              >
                <span style={{ fontSize: 20 }}>{emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: category === label ? 'white' : 'var(--text-muted)', lineHeight: 1 }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          {[
            { label: "What are you doing?", placeholder: "e.g. Pickup Basketball, Coffee Run...", value: what, onChange: setWhat },
            { label: "When?", placeholder: "e.g. Tonight at 7pm, Saturday afternoon...", value: when, onChange: setWhen },
            { label: "Where?", placeholder: "e.g. Student Rec Center, Blue Bottle...", value: where, onChange: setWhere },
          ].map(field => (
            <div key={field.label}>
              <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                {field.label}
              </label>
              <input
                className="vibe-input"
                placeholder={field.placeholder}
                value={field.value}
                onChange={e => field.onChange(e.target.value)}
              />
            </div>
          ))}

          {/* People count */}
          <div>
            <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              How many people?
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['2', '4', '6', '8', '10+'].map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  style={{
                    flex: 1,
                    background: count === n ? 'var(--gradient)' : 'var(--card)',
                    border: count === n ? 'none' : '1px solid rgba(139,92,246,0.15)',
                    borderRadius: 12,
                    padding: '12px 0',
                    color: count === n ? 'white' : 'var(--text-muted)',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.2s',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Tell people about it
            </label>
            <textarea
              className="vibe-input"
              placeholder="What should people know? Skill level, what to bring, vibe..."
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={4}
              style={{ resize: 'none', lineHeight: 1.6 }}
            />
          </div>
        </div>

        {/* Visibility */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
            Who can join?
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {visibilityOptions.map(opt => (
              <button
                key={opt.label}
                onClick={() => setVisibility(opt.label)}
                style={{
                  background: visibility === opt.label ? 'rgba(139,92,246,0.12)' : 'var(--card)',
                  border: `1.5px solid ${visibility === opt.label ? 'var(--main-bright)' : 'rgba(139,92,246,0.12)'}`,
                  borderRadius: 16,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: 22 }}>{opt.icon}</span>
                <div>
                  <div style={{ color: 'var(--text)', fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{opt.label}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{opt.sub}</div>
                </div>
                {visibility === opt.label && (
                  <div style={{ marginLeft: 'auto', color: 'var(--main-bright)', fontSize: 18 }}>✓</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post button */}
      <div style={{ padding: '16px 24px 40px' }}>
        <button
          className="btn-primary"
          onClick={canPost ? onPost : undefined}
          style={{ fontSize: 17, opacity: canPost ? 1 : 0.45 }}
        >
          Post Activity 🚀
        </button>
      </div>
    </div>
  );
}

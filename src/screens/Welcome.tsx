import React from 'react';

interface WelcomeProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function Welcome({ onGetStarted, onLogin }: WelcomeProps) {
  return (
    <div className="screen" style={{ background: 'var(--bg)', justifyContent: 'center', alignItems: 'center', padding: '40px 32px' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, rgba(255,122,48,0.1) 50%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '10%',
        width: 200,
        height: 200,
        background: 'radial-gradient(circle, rgba(255,122,48,0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 60, position: 'relative' }}>
        {/* V icon */}
        <div style={{
          width: 90,
          height: 90,
          borderRadius: 26,
          background: 'linear-gradient(145deg, #241A35, #120D1C)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139,92,246,0.2)',
        }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <defs>
              <linearGradient id="vlogo" x1="8" y1="10" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF7A30" />
                <stop offset="0.4" stopColor="#E040A0" />
                <stop offset="0.75" stopColor="#8B5CF6" />
                <stop offset="1" stopColor="#5B21B6" />
              </linearGradient>
            </defs>
            <path d="M8 10L20 42L26 26L32 42L44 10" stroke="url(#vlogo)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <div style={{
          fontSize: 52,
          fontWeight: 900,
          letterSpacing: -2,
          lineHeight: 1,
          marginBottom: 12,
        }} className="vg-text">
          Vibe
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.5, margin: 0 }}>
          Find your people.<br />Do something together.
        </p>
      </div>

      {/* Feature pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 60, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['Real friendships', 'Activities', 'No BS'].map(label => (
          <div key={label} style={{
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: 100,
            padding: '6px 14px',
            fontSize: 13,
            color: 'var(--violet-bright)',
            fontWeight: 500,
          }}>
            {label}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn-primary" onClick={onGetStarted} style={{ fontSize: 17 }}>
          Get Started
        </button>
        <button
          onClick={onLogin}
          style={{
            background: 'none',
            border: '1.5px solid rgba(139, 92, 246, 0.25)',
            borderRadius: 16,
            padding: '15px 24px',
            color: 'var(--text-muted)',
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            transition: 'border-color 0.2s, color 0.2s',
          }}
        >
          Log In
        </button>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 24, textAlign: 'center', opacity: 0.6 }}>
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}

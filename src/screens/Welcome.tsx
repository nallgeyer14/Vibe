import React from 'react';

interface WelcomeProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function Welcome({ onGetStarted, onLogin }: WelcomeProps) {
  return (
    <div
      className="screen"
      style={{
        background: 'var(--bg)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 32px',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 300,
          background:
            'radial-gradient(circle, rgba(91,143,197,0.16) 0%, rgba(232,117,97,0.08) 45%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          right: '10%',
          width: 200,
          height: 200,
          background:
            'radial-gradient(circle, rgba(232,117,97,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 0,
          position: 'relative',
          transform: 'translateY(-70px)',
        }}
        >
        <div
          style={{
            fontFamily: "'Satisfy', cursive",
            fontSize: 125,
            fontWeight: 400,
            letterSpacing: 0,
            lineHeight: 1,
            marginBottom: 35,
            color: 'var(--violet)',
            transform: 'translateY(-20px)',
          }}
         >
          Vibe
        </div>

        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 17,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Find your people.
          <br />
          Do something together.
        </p>
      </div>

      {/* Feature pills */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {['Real friendships', 'Activities', 'No BS'].map(label => (
          <div
            key={label}
            style={{
              background: 'rgba(61, 111, 168, 0.08)',
              border: '1px solid rgba(61, 111, 168, 0.18)',
              borderRadius: 100,
              padding: '6px 14px',
              fontSize: 13,
              color: 'var(--violet)',
              fontWeight: 600,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <button
          className="btn-primary"
          onClick={onGetStarted}
          style={{ fontSize: 17 }}
        >
          Get Started
        </button>

        <button
          onClick={onLogin}
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(61, 111, 168, 0.25)',
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

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: 12,
          marginTop: 10,
          textAlign: 'center',
          opacity: 0.6,
        }}
      >
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
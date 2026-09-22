import React, { useState } from 'react';
import { loginUser } from '../services/api';

interface LoginProps {
  onBack: () => void;
  onLoginSuccess: (token: string, userId: number) => void;
}

export default function Login({
  onBack,
  onLoginSuccess,
}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await loginUser(email.trim(), password);

      localStorage.setItem('vibe_token', response.access_token);
      localStorage.setItem('vibe_user_id', String(response.user_id));

      onLoginSuccess(response.access_token, response.user_id);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to log in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="screen"
      style={{
        background: 'var(--bg)',
        padding: '40px 32px',
        position: 'relative',
      }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          background: 'transparent',
          border: 'none',
          color: 'var(--text)',
          fontSize: 24,
          cursor: 'pointer',
          padding: 8,
        }}
        aria-label="Go back"
      >
        ←
      </button>

      {/* Header */}
      <div
        style={{
          width: '100%',
          marginTop: 55,
          marginBottom: 35,
        }}
      >
        <div
          style={{
            fontFamily: "'Satisfy', cursive",
            fontSize: 72,
            color: 'var(--violet)',
            lineHeight: 1,
            marginBottom: 18,
          }}
        >
          Vibe
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            color: 'var(--text)',
          }}
        >
          Welcome back
        </h1>

        <p
          style={{
            marginTop: 8,
            color: 'var(--text-muted)',
            fontSize: 15,
            lineHeight: 1.5,
          }}
        >
          Log in to get back to your people.
        </p>
      </div>

      {/* Form */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 7,
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text)',
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '15px 16px',
              borderRadius: 14,
              border: '1px solid rgba(61, 111, 168, 0.2)',
              background: 'var(--card)',
              color: 'var(--text)',
              fontSize: 16,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 7,
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--text)',
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '15px 16px',
              borderRadius: 14,
              border: '1px solid rgba(61, 111, 168, 0.2)',
              background: 'var(--card)',
              color: 'var(--text)',
              fontSize: 16,
              fontFamily: 'Inter, sans-serif',
              outline: 'none',
            }}
          />
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(232, 117, 97, 0.1)',
              border: '1px solid rgba(232, 117, 97, 0.25)',
              borderRadius: 12,
              padding: '11px 13px',
              color: '#B94E3B',
              fontSize: 14,
              lineHeight: 1.4,
            }}
          >
            {error}
          </div>
        )}

        <button
          className="btn-primary"
          onClick={handleLogin}
          disabled={loading}
          style={{
            marginTop: 4,
            fontSize: 17,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </div>
  );
}
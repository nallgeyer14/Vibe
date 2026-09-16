import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [socialPref, setSocialPref] = useState('');

  const socialOptions = [
    { label: 'Introvert', sub: 'Prefer small groups & deep convos', icon: '🌙' },
    { label: 'Ambivert', sub: 'Good in both big and small settings', icon: '✨' },
    { label: 'Extrovert', sub: 'Love big energy and meeting everyone', icon: '🔥' },
  ];

  const steps = [
    // Step 0: Photo + Name
    <div key="0" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 28px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 6px', letterSpacing: -0.5 }}>
          Let's set up your profile
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
          This is what people will see when they discover you.
        </p>
      </div>

      {/* Photo upload */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
        <div style={{
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: 'var(--card-el)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          position: 'relative',
          cursor: 'pointer',
          border: '2px dashed rgba(139, 92, 246, 0.3)',
        }}>
          <img
            src="https://i.pravatar.cc/400?img=12"
            alt="Profile"
            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            background: 'var(--gradient)',
            borderRadius: '50%',
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: 14, lineHeight: 1 }}>+</span>
          </div>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Tap to add photo</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            First Name
          </label>
          <input
            className="vibe-input"
            placeholder="Your first name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            Age
          </label>
          <input
            className="vibe-input"
            placeholder="Your age"
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
        </div>
        <div>
          <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
            School / Work
          </label>
          <input
            className="vibe-input"
            placeholder="e.g. Computer Science @ UCLA"
          />
        </div>
      </div>
    </div>,

    // Step 1: Bio
    <div key="1" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 28px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 6px', letterSpacing: -0.5 }}>
          Who are you?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
          A short bio helps people decide if your vibe matches.
        </p>
      </div>

      <div>
        <textarea
          className="vibe-input"
          placeholder="Write a short bio... What are you into? What makes you, you?"
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={5}
          style={{ resize: 'none', lineHeight: 1.6 }}
        />
        <div style={{ textAlign: 'right', marginTop: 6 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{bio.length}/150</span>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
          What kind of friends are you looking for?
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Activity partners', 'Genuine friendships', 'Study buddies', 'Gaming crew', 'All of the above'].map(opt => (
            <button
              key={opt}
              style={{
                background: 'var(--card)',
                border: '1.5px solid rgba(139, 92, 246, 0.2)',
                borderRadius: 14,
                padding: '14px 16px',
                color: 'var(--text)',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'Inter, sans-serif',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Step 2: Social preference
    <div key="2" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 28px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 6px', letterSpacing: -0.5 }}>
          What's your social style?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
          Helps us find friends whose energy matches yours.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {socialOptions.map(opt => (
          <button
            key={opt.label}
            onClick={() => setSocialPref(opt.label)}
            style={{
              background: socialPref === opt.label ? 'rgba(139, 92, 246, 0.15)' : 'var(--card)',
              border: `1.5px solid ${socialPref === opt.label ? 'var(--violet-bright)' : 'rgba(139, 92, 246, 0.15)'}`,
              borderRadius: 18,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 28, lineHeight: 1 }}>{opt.icon}</span>
            <div>
              <div style={{ color: 'var(--text)', fontSize: 17, fontWeight: 700, marginBottom: 3 }}>
                {opt.label}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{opt.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>,
  ];

  const totalSteps = steps.length;
  const isLast = step === totalSteps - 1;

  return (
    <div className="screen" style={{ padding: '56px 0 0' }}>
      {/* Header */}
      <div style={{ padding: '0 28px', marginBottom: 32 }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 3,
              borderRadius: 100,
              background: i <= step ? 'var(--gradient)' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: 15,
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ← Back
          </button>
        )}
      </div>

      {/* Step content */}
      <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', paddingBottom: 20 }}>
        {steps[step]}
      </div>

      {/* Continue button */}
      <div style={{ padding: '20px 28px 40px' }}>
        <button
          className="btn-primary"
          onClick={() => isLast ? onComplete() : setStep(s => s + 1)}
          style={{ fontSize: 17 }}
        >
          {isLast ? 'Choose Interests →' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}

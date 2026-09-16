import React, { useState, useRef } from 'react';
import { profiles, Profile } from '../data';

interface VibesProps {
  onMatch: (profile: Profile) => void;
}

function CompatibilityRing({ pct }: { pct: number }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
      <circle
        cx="24" cy="24" r={r} fill="none"
        stroke="url(#cg)" strokeWidth="3"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FF7A30" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SwipeCard({ profile, onSwipe, isTop }: { profile: Profile; onSwipe: (dir: 'left' | 'right') => void; isTop: boolean }) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null);
  const startX = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isTop) return;
    startX.current = e.clientX;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragX(e.clientX - startX.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX > 90) {
      triggerSwipe('right');
    } else if (dragX < -90) {
      triggerSwipe('left');
    } else {
      setDragX(0);
    }
  };

  const triggerSwipe = (dir: 'left' | 'right') => {
    setExiting(dir);
    setTimeout(() => onSwipe(dir), 320);
  };

  const rotation = dragX * 0.06;
  const likeOpacity = Math.max(0, dragX / 80);
  const nopeOpacity = Math.max(0, -dragX / 80);

  const transform = exiting === 'right'
    ? 'translateX(500px) rotate(30deg)'
    : exiting === 'left'
    ? 'translateX(-500px) rotate(-30deg)'
    : `translateX(${dragX}px) rotate(${rotation}deg)`;

  const transition = isDragging ? 'none' : exiting ? 'transform 0.32s ease-in' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'absolute',
        inset: 0,
        transform,
        transition,
        cursor: isTop ? 'grab' : 'default',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: 28,
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--card)',
      }}>
        {/* Profile photo */}
        <img
          src={profile.photo}
          alt={profile.name}
          draggable={false}
          style={{
            width: '100%',
            height: '62%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />

        {/* Like / Nope overlays */}
        <div style={{
          position: 'absolute',
          top: 36,
          left: 24,
          opacity: likeOpacity,
          border: '3px solid #4ADE80',
          borderRadius: 8,
          padding: '6px 14px',
          transform: 'rotate(-15deg)',
          transition: 'opacity 0.1s',
        }}>
          <span style={{ color: '#4ADE80', fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>VIBE</span>
        </div>
        <div style={{
          position: 'absolute',
          top: 36,
          right: 24,
          opacity: nopeOpacity,
          border: '3px solid #F87171',
          borderRadius: 8,
          padding: '6px 14px',
          transform: 'rotate(15deg)',
          transition: 'opacity 0.1s',
        }}>
          <span style={{ color: '#F87171', fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>PASS</span>
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '55%',
          background: 'linear-gradient(to top, rgba(11,9,16,0.98) 0%, rgba(11,9,16,0.7) 50%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: -0.5, lineHeight: 1.1 }}>
                {profile.name}, {profile.age}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 3 }}>{profile.school}</div>
            </div>
            {/* Compatibility */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CompatibilityRing pct={profile.match} />
              <div style={{
                position: 'absolute',
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--text)',
                lineHeight: 1,
              }}>
                {profile.match}%
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {profile.bio}
          </p>

          {/* Shared interests */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 7 }}>
              You both like
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {profile.interests.slice(0, 3).map(tag => (
                <span key={tag} style={{
                  background: 'rgba(255, 122, 48, 0.15)',
                  border: '1px solid rgba(255, 122, 48, 0.3)',
                  borderRadius: 100,
                  padding: '4px 11px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--orange-bright)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Vibes({ onMatch }: VibesProps) {
  const [deck, setDeck] = useState(profiles);
  const [recentSwipe, setRecentSwipe] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (dir: 'left' | 'right') => {
    const top = deck[0];
    setRecentSwipe(dir);
    setTimeout(() => setRecentSwipe(null), 600);
    setDeck(prev => prev.slice(1));
    if (dir === 'right' && top.match >= 79) {
      setTimeout(() => onMatch(top), 400);
    }
  };

  const triggerSwipe = (dir: 'left' | 'right') => {
    // programmatic swipe via button
    handleSwipe(dir);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', margin: 0, letterSpacing: -1 }} className="vg-text">
            Vibes
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '2px 0 0' }}>Swipe to connect</p>
        </div>
        <button style={{
          background: 'var(--card-el)',
          border: '1px solid rgba(139,92,246,0.2)',
          borderRadius: 14,
          padding: '10px 14px',
          color: 'var(--text-muted)',
          fontSize: 14,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}>
          ⚙️ Filters
        </button>
      </div>

      {/* Card stack */}
      <div style={{ flex: 1, padding: '0 20px', position: 'relative', minHeight: 0 }}>
        {deck.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 16,
          }}>
            <div style={{ fontSize: 48 }}>✨</div>
            <div style={{ color: 'var(--text)', fontSize: 20, fontWeight: 700 }}>You've seen everyone!</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center' }}>Check back later for new people in your area.</div>
            <button className="btn-primary" style={{ width: 'auto', padding: '14px 32px' }} onClick={() => setDeck(profiles)}>
              Start Over
            </button>
          </div>
        ) : (
          <div style={{ position: 'relative', height: '100%' }}>
            {/* Back cards (subtle stack effect) */}
            {deck.slice(1, 3).map((p, i) => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: `scale(${0.95 - i * 0.03}) translateY(${(i + 1) * 12}px)`,
                  zIndex: 2 - i,
                  borderRadius: 28,
                  background: 'var(--card)',
                  border: '1px solid rgba(139,92,246,0.1)',
                }}
              />
            ))}
            {/* Top card */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
              <SwipeCard profile={deck[0]} onSwipe={handleSwipe} isTop />
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {deck.length > 0 && (
        <div style={{ padding: '16px 20px 100px', display: 'flex', justifyContent: 'center', gap: 20, alignItems: 'center' }}>
          <button
            onClick={() => triggerSwipe('left')}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'var(--card-el)',
              border: '1.5px solid rgba(248, 113, 113, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 22,
              transition: 'transform 0.1s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ✕
          </button>

          <button
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(255, 212, 59, 0.1)',
              border: '1.5px solid rgba(255, 212, 59, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 20,
            }}
          >
            ⭐
          </button>

          <button
            onClick={() => triggerSwipe('right')}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'var(--gradient)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 22,
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)',
              transition: 'transform 0.1s',
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ♥
          </button>
        </div>
      )}
    </div>
  );
}

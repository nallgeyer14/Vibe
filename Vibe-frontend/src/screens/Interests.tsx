import React, { useState } from 'react';
import { interests } from '../data';
import {
  getInterests,
  setUserInterests,
} from '../services/api';

interface InterestsProps {
  onComplete: () => void;
}

export default function Interests({ onComplete }: InterestsProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(['Music', 'Hiking', 'Food']));
  const [isSaving, setIsSaving] = useState(false);
  const toggle = (label: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <div className="screen" style={{ padding: '56px 0 0' }}>
      <div style={{ padding: '0 24px 20px' }}>
        <div style={{ marginBottom: 6 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Step 3 of 3
          </span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', margin: '0 0 8px', letterSpacing: -0.5 }}>
          What are you into?
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
          Pick at least 3. This shapes who you meet and what activities you see.
        </p>
      </div>

      <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}>
          {interests.map(({ label, emoji }) => {
            const isSelected = selected.has(label);
            return (
              <button
                key={label}
                onClick={() => toggle(label)}
                style={{
                  background: isSelected ? 'var(--gradient)' : 'var(--card)',
                  border: isSelected ? 'none' : '1px solid rgba(61, 111, 168, 0.18)',
                  borderRadius: 16,
                  padding: '16px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isSelected ? '0 4px 20px rgba(61, 111, 168, 0.3)' : 'none',
                }}
              >
                <span style={{ fontSize: 26, lineHeight: 1 }}>{emoji}</span>
                <span style={{
                  fontSize: 12,
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? 'white' : 'var(--text-muted)',
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '16px 24px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            {selected.size} selected
            {selected.size < 3 && <span style={{ color: 'var(--orange)' }}> · choose {3 - selected.size} more</span>}
          </span>
        </div>
        <button
          className="btn-primary"
          onClick={async () => {
            try {
              const token = localStorage.getItem('vibe_token');

              if (!token) {
                alert('You are not logged in.');
                return;
              }

              setIsSaving(true);

              const backendInterests = await getInterests();

              const selectedIds = backendInterests
                .filter(interest => selected.has(interest.name))
                .map(interest => interest.id);

              if (selectedIds.length < 3) {
                alert('Please select at least 3 interests.');
                return;
              }

              await setUserInterests(token, selectedIds);

              onComplete();
            } catch (error) {
              console.error('Interest save failed:', error);
              alert(
                error instanceof Error
                  ? error.message
                  : 'Failed to save interests'
              );
            } finally {
              setIsSaving(false);
            }
          }}
          disabled={selected.size < 3 || isSaving}
          style={{
            fontSize: 17,
            opacity: selected.size < 3 || isSaving ? 0.5 : 1,
          }}
          >
          {isSaving ? 'Saving...' : 'Find My Vibe →'}
        </button>
      </div>
    </div>
  );
}

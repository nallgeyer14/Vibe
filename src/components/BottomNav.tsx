import React from 'react';

type Tab = 'vibes' | 'activities' | 'chats' | 'profile';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  unreadChats?: number;
}

function VibesIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21C12 21 3 15.5 3 9.5C3 7 5 5 7.5 5C9 5 10.5 5.75 12 7.5C13.5 5.75 15 5 16.5 5C19 5 21 7 21 9.5C21 15.5 12 21 12 21Z"
        fill={active ? 'url(#vg1)' : 'none'}
        stroke={active ? 'none' : '#A8A0B5'}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="vg1" x1="3" y1="5" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A30" />
          <stop offset="0.5" stopColor="#E040A0" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ActivitiesIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="14" rx="3"
        fill={active ? 'none' : 'none'}
        stroke={active ? 'url(#vg2)' : '#A8A0B5'}
        strokeWidth="1.8"
      />
      <path d="M8 4V8M16 4V8M3 10H21"
        stroke={active ? 'url(#vg2)' : '#A8A0B5'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {active && <circle cx="12" cy="15" r="2" fill="url(#vg2)" />}
      <defs>
        <linearGradient id="vg2" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A30" />
          <stop offset="0.5" stopColor="#E040A0" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ChatsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4H16C17.1 4 18 4.9 18 6V14C18 15.1 17.1 16 16 16H8L4 20V6C4 4.9 4.9 4 6 4"
        fill="none"
        stroke={active ? 'url(#vg3)' : '#A8A0B5'}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M21 8V18L19 16H12C11 16 20 16 20 8"
        fill="none"
        stroke={active ? 'url(#vg3)' : '#A8A0B5'}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={active ? 0 : 0}
      />
      <defs>
        <linearGradient id="vg3" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A30" />
          <stop offset="0.5" stopColor="#E040A0" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
        stroke={active ? 'url(#vg4)' : '#A8A0B5'}
        strokeWidth="1.8"
      />
      <path d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20"
        stroke={active ? 'url(#vg4)' : '#A8A0B5'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="vg4" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A30" />
          <stop offset="0.5" stopColor="#E040A0" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const tabs: { id: Tab; label: string; Icon: React.FC<{ active: boolean }> }[] = [
  { id: 'vibes', label: 'Vibes', Icon: VibesIcon },
  { id: 'activities', label: 'Activities', Icon: ActivitiesIcon },
  { id: 'chats', label: 'Chats', Icon: ChatsIcon },
  { id: 'profile', label: 'Profile', Icon: ProfileIcon },
];

export default function BottomNav({ activeTab, onTabChange, unreadChats = 0 }: BottomNavProps) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(18, 13, 28, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(139, 92, 246, 0.12)',
      display: 'flex',
      paddingBottom: 20,
      paddingTop: 12,
      zIndex: 50,
    }}>
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative' }}>
            <Icon active={activeTab === id} />
            {id === 'chats' && unreadChats > 0 && (
              <div style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: 'var(--orange)',
                borderRadius: '50%',
                width: 16,
                height: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color: 'white',
              }}>
                {unreadChats}
              </div>
            )}
          </div>
          <span style={{
            fontSize: 11,
            fontWeight: activeTab === id ? 600 : 400,
            color: activeTab === id ? 'var(--violet-bright)' : 'var(--text-muted)',
            fontFamily: 'Inter, sans-serif',
            transition: 'color 0.2s',
          }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

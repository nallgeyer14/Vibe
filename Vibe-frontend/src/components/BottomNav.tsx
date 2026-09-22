import React from 'react';

type Tab = 'vibes' | 'activities' | 'chats' | 'profile';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  unreadChats?: number;
}

function VibesIcon({ active }: { active: boolean }) {
  return (
    <svg width="28" height="22.5" viewBox="0 0 28 10" fill="none">
      <text
        x="14"
        y="10"
        textAnchor="middle"
        fontFamily="Satisfy, cursive"
        fontSize="20"
        fontWeight="400"
        fill={active ? '#3D6FA8' : '#66727D'}
      >
        V
      </text>
    </svg>
  );
}

function ActivitiesIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="6"
        width="18"
        height="14"
        rx="3"
        fill="none"
        stroke={active ? '#3D6FA8' : '#66727D'}
        strokeWidth="1.8"
      />
      <path
        d="M8 4V8M16 4V8M3 10H21"
        stroke={active ? '#3D6FA8' : '#66727D'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {active && (
        <circle
          cx="12"
          cy="15"
          r="2"
          fill="#E87561"
        />
      )}
    </svg>
  );
}

function ChatsIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4H16C17.1 4 18 4.9 18 6V14C18 15.1 17.1 16 16 16H8L4 20V6C4 4.9 4.9 4 6 4"
        fill="none"
        stroke={active ? '#3D6FA8' : '#66727D'}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke={active ? '#3D6FA8' : '#66727D'}
        strokeWidth="1.8"
      />
      <path
        d="M4 20C4 16.686 7.582 14 12 14C16.418 14 20 16.686 20 20"
        stroke={active ? '#3D6FA8' : '#66727D'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const tabs: {
  id: Tab;
  label: string;
  Icon: React.FC<{ active: boolean }>;
}[] = [
  { id: 'vibes', label: 'Vibes', Icon: VibesIcon },
  { id: 'activities', label: 'Activities', Icon: ActivitiesIcon },
  { id: 'chats', label: 'Chats', Icon: ChatsIcon },
  { id: 'profile', label: 'Profile', Icon: ProfileIcon },
];

export default function BottomNav({
  activeTab,
  onTabChange,
  unreadChats = 0,
}: BottomNavProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(31, 41, 51, 0.08)',
        display: 'flex',
        paddingBottom: 20,
        paddingTop: 12,
        zIndex: 50,
      }}
    >
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
              <div
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  background: 'var(--orange)',
                  borderRadius: '50%',
                  width: 17,
                  height: 17,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'white',
                  border: '2px solid white',
                }}
              >
                {unreadChats}
              </div>
            )}
          </div>

          <span
            style={{
              fontSize: 11,
              fontWeight: activeTab === id ? 700 : 500,
              color:
                activeTab === id
                  ? 'var(--violet)'
                  : 'var(--text-muted)',
              fontFamily: 'Inter, sans-serif',
              transition: 'color 0.2s',
            }}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
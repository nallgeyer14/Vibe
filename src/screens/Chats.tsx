import React from 'react';
import { chats } from '../data';

interface ChatsProps {
  onChatOpen: (id: number) => void;
}

function GroupAvatar({ name }: { name: string }) {
  return (
    <div style={{
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'var(--gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      flexShrink: 0,
    }}>
      {name.includes('Basketball') ? '🏀' : name.includes('Coffee') ? '☕' : '💬'}
    </div>
  );
}

export default function Chats({ onChatOpen }: ChatsProps) {
  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', margin: '0 0 2px', letterSpacing: -1 }}>
          Chats
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
          {totalUnread > 0 ? `${totalUnread} unread messages` : 'All caught up!'}
        </p>
      </div>

      {/* Search */}
      <div style={{ padding: '0 24px 16px' }}>
        <input className="vibe-input" placeholder="🔍  Search conversations..." />
      </div>

      {/* Chats list */}
      <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', paddingBottom: 90 }}>
        {chats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onChatOpen(chat.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 24px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              fontFamily: 'Inter, sans-serif',
              transition: 'background 0.15s',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(139,92,246,0.05)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {chat.isGroup ? (
                <GroupAvatar name={chat.name} />
              ) : (
                <img
                  src={chat.photo}
                  alt={chat.name}
                  style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
              {chat.unread > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  background: 'var(--orange)',
                  borderRadius: '50%',
                  border: '2px solid var(--bg)',
                }} />
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: chat.unread > 0 ? 700 : 600, color: 'var(--text)' }}>
                  {chat.name}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 8 }}>
                  {chat.time}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: 14,
                  color: chat.unread > 0 ? 'var(--text-muted)' : 'var(--text-muted)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                  fontWeight: chat.unread > 0 ? 500 : 400,
                }}>
                  {chat.lastMessage}
                </span>
                {chat.unread > 0 && (
                  <div style={{
                    marginLeft: 8,
                    background: 'var(--violet-bright)',
                    borderRadius: '50%',
                    minWidth: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'white',
                    flexShrink: 0,
                    padding: '0 5px',
                  }}>
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { chats } from '../data';

interface ChatDetailProps {
  chatId: number;
  onBack: () => void;
}

export default function ChatDetail({ chatId, onBack }: ChatDetailProps) {
  const chat = chats.find(c => c.id === chatId) ?? chats[0];
  const [messages, setMessages] = useState(chat.messages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: input,
      from: 'me',
      time: 'Now',
    }]);
    setInput('');
  };

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        padding: '56px 20px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(18,13,28,0.95)',
        backdropFilter: 'blur(20px)',
        flexShrink: 0,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--violet-bright)',
            cursor: 'pointer',
            fontSize: 18,
            padding: '4px 8px 4px 0',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          ←
        </button>
        {chat.isGroup ? (
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}>
            {chat.name.includes('Basketball') ? '🏀' : '☕'}
          </div>
        ) : (
          <img src={chat.photo} alt={chat.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
        )}
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{chat.name}</div>
          <div style={{ fontSize: 12, color: 'var(--violet-bright)' }}>
            {chat.isGroup ? `${chat.messages.length} members` : 'Active now'}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="scroll-y" style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((msg, i) => {
          const isMe = msg.from === 'me';
          const showAvatar = !isMe && (i === 0 || messages[i - 1].from === 'me');
          return (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: isMe ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: 8,
            }}>
              {!isMe && (
                <div style={{ width: 32, flexShrink: 0 }}>
                  {showAvatar && (
                    chat.isGroup ? (
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                        {chat.name.includes('Basketball') ? '🏀' : '☕'}
                      </div>
                    ) : (
                      <img src={chat.photo} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                    )
                  )}
                </div>
              )}
              <div style={{ maxWidth: '72%' }}>
                <div style={{
                  background: isMe ? 'var(--gradient)' : 'var(--card-el)',
                  borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  padding: '11px 16px',
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: isMe ? 'white' : 'var(--text)',
                  wordBreak: 'break-word',
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  marginTop: 4,
                  textAlign: isMe ? 'right' : 'left',
                  opacity: 0.7,
                }}>
                  {msg.time}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px 36px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(18,13,28,0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <input
          className="vibe-input"
          placeholder="Message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          style={{ flex: 1 }}
        />
        <button
          onClick={send}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: input.trim() ? 'var(--gradient)' : 'var(--card-el)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            fontSize: 18,
            transition: 'all 0.2s',
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}

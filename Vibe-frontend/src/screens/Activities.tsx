import React, { useState } from 'react';
import { activities } from '../data';
import type { Activity } from '../data';
const categories = ['All', 'Sports', 'Social', 'Gaming', 'Outdoors', 'Music', 'Cars'];

interface ActivitiesProps {
  onActivityDetail: (id: number) => void;
  onCreateActivity: () => void;
}

function ActivityCard({
  activity,
  onClick,
}: {
  activity: Activity;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${activity.color}22, ${activity.color}44)`,
        border: '1px solid rgba(61, 111, 168, .1)',
        borderRadius: 22,
        padding: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        flexShrink: 0,
        fontFamily: 'Inter, sans-serif',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseDown={e => {
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        {/* Emoji */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: `${activity.color}30`,
            border: `1.5px solid ${activity.color}50`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          {activity.emoji}
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: 6,
            }}
          >
            {activity.title}
          </div>

          {/* Category */}
          <span
            style={{
              display: 'inline-block',
              background: `${activity.color}25`,
              border: `1px solid ${activity.color}40`,
              borderRadius: 100,
              padding: '3px 10px',
              fontSize: 11,
              fontWeight: 600,
              color: activity.color,
              marginBottom: 12,
            }}
          >
            {activity.category}
          </span>

          {/* Date / Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              marginBottom: 7,
            }}
          >
            <span style={{ fontSize: 14 }}>📅</span>
            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: 13,
              }}
            >
              {activity.date} • {activity.time}
            </span>
          </div>

          {/* Location */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <span style={{ fontSize: 14 }}>📍</span>
            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: 13,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {activity.location}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Activities({ onActivityDetail, onCreateActivity }: ActivitiesProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = activities.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '56px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: -1, color: 'var(--text)' }}>
              Activities
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '2px 0 0' }}>Find something to do</p>
          </div>
          <button
            onClick={onCreateActivity}
            style={{
              background: 'var(--gradient)',
              border: 'none',
              borderRadius: 16,
              padding: '10px 18px',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 16px rgba(61, 111, 168, 0.3)',
            }}
          >
            + Create
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input
            className="vibe-input"
            placeholder="🔍  Search activities or places..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 16 }}
          />
        </div>

        {/* Categories */}
        <div className="scroll-x" style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'var(--gradient)' : 'var(--card)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(61, 111, 168, .2)',
                borderRadius: 100,
                padding: '8px 18px',
                color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div
  className="scroll-y"
  style={{
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: '16px 20px 120px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    boxSizing: 'border-box',
  }}
>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No activities found</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try a different category or search</div>
          </div>
        ) : (
          filtered.map(activity => (
            <ActivityCard key={activity.id} activity={activity} onClick={() => onActivityDetail(activity.id)} />
          ))
        )}
      </div>
    </div>
  );
}

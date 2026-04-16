'use client';

import React from 'react';
import { useEditor, useEditorActions } from '@/store/context';
import { CANVAS_PRESETS } from '@/lib/constants';
import { Monitor, Smartphone, Square, Layout, SlidersHorizontal } from 'lucide-react';

const platformIconMap: Record<string, React.ReactNode> = {
  'ig-post': <Square size={14} />,
  'ig-story': <Smartphone size={14} />,
  'twitter-post': <Monitor size={14} />,
  'linkedin-post': <Layout size={14} />,
  'fb-cover': <Monitor size={14} />,
  'pinterest-pin': <Square size={14} />,
  'yt-thumb': <Monitor size={14} />,
  'custom': <SlidersHorizontal size={14} />,
};

export function PresetPanel() {
  const { state } = useEditor();
  const { setCanvasSize } = useEditorActions();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--gray-500)',
          marginBottom: 4,
        }}
      >
        Canvas Size
      </div>
      {CANVAS_PRESETS.map((preset) => {
        const isActive = state.selectedPresetId === preset.id;
        return (
          <button
            key={preset.id}
            onClick={() => setCanvasSize(preset.width, preset.height, preset.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 12,
              border: 'none',
              background: isActive ? 'var(--accent-primary-soft)' : 'transparent',
              color: isActive ? 'var(--accent-primary)' : 'var(--gray-600)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              width: '100%',
              textAlign: 'left',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'var(--gray-50)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: isActive ? 'rgba(99,102,241,0.12)' : 'var(--gray-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                flexShrink: 0,
                color: isActive ? 'var(--accent-primary)' : 'var(--gray-500)',
              }}
            >
              {platformIconMap[preset.id] || preset.icon}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{preset.name}</span>
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--gray-400)',
                  fontFamily: 'var(--font-mono)',
                  marginTop: 1,
                  flexShrink: 0,
                }}
              >
                {preset.width} × {preset.height}
              </span>
            </div>
          </button>
        );
      })}
      {state.selectedPresetId === 'custom' && (
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <label
              style={{ fontSize: 10, color: 'var(--gray-500)', display: 'block', marginBottom: 4 }}
            >
              Width
            </label>
            <input
              type="number"
              className="input-field input-mono"
              value={state.canvasWidth}
              onChange={(e) =>
                setCanvasSize(Number(e.target.value), state.canvasHeight, 'custom')
              }
              min={100}
              max={4096}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{ fontSize: 10, color: 'var(--gray-500)', display: 'block', marginBottom: 4 }}
            >
              Height
            </label>
            <input
              type="number"
              className="input-field input-mono"
              value={state.canvasHeight}
              onChange={(e) =>
                setCanvasSize(state.canvasWidth, Number(e.target.value), 'custom')
              }
              min={100}
              max={4096}
            />
          </div>
        </div>
      )}
    </div>
  );
}
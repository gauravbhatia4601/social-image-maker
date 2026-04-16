'use client';

import React, { useState } from 'react';
import { useEditor, useEditorActions } from '@/store/context';
import { PRESET_COLORS, GRADIENT_PRESETS } from '@/lib/constants';
import { ImageUploader } from '@/components/ui/ImageUploader';
import { BackgroundConfig } from '@/types/editor';
import { Palette, Droplets, Image as ImageIcon, Layers } from 'lucide-react';

type BgTab = 'solid' | 'gradient' | 'image';

export function BackgroundPanel() {
  const { state } = useEditor();
  const { setBackground, showToast } = useEditorActions();
  const [activeTab, setActiveTab] = useState<BgTab>(state.background.type === 'image' ? 'image' : state.background.type === 'gradient' ? 'gradient' : 'solid');
  const [customColor, setCustomColor] = useState(state.background.solidColor);
  const [gradStart, setGradStart] = useState(state.background.gradientStart);
  const [gradEnd, setGradEnd] = useState(state.background.gradientEnd);
  const [gradDir, setGradDir] = useState(state.background.gradientDirection);
  const [gradType, setGradType] = useState<'linear' | 'radial'>(state.background.gradientType);

  const tabs: { id: BgTab; label: string; icon: React.ReactNode }[] = [
    { id: 'solid', label: 'Color', icon: <Droplets size={14} /> },
    { id: 'gradient', label: 'Gradient', icon: <Palette size={14} /> },
    { id: 'image', label: 'Image', icon: <ImageIcon size={14} /> },
  ];

  const handleSolidSelect = (color: string) => {
    setCustomColor(color);
    setBackground({ ...state.background, type: 'solid', solidColor: color });
  };

  const handleGradientPreset = (start: string, end: string, direction: string) => {
    setGradStart(start);
    setGradEnd(end);
    setGradDir(direction);
    setBackground({
      ...state.background,
      type: 'gradient',
      gradientStart: start,
      gradientEnd: end,
      gradientDirection: direction,
      gradientType: 'linear',
    });
  };

  const handleImageUpload = (dataUrl: string) => {
    setBackground({
      ...state.background,
      type: 'image',
      imageUrl: dataUrl,
    });
    showToast('Background image applied', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--gray-500)',
        }}
      >
        Background
      </div>

      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: 4,
          background: 'var(--gray-100)',
          borderRadius: 12,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '8px 12px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === tab.id ? 'var(--surface-base)' : 'transparent',
              color: activeTab === tab.id ? 'var(--gray-700)' : 'var(--gray-500)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: activeTab === tab.id ? 500 : 400,
              boxShadow: activeTab === tab.id ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'solid' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 6,
            }}
          >
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                className="color-chip"
                style={{
                  background: color,
                  outline:
                    state.background.solidColor === color
                      ? '2px solid var(--accent-primary)'
                      : 'none',
                  outlineOffset: '2px',
                  border: color === '#FFFFFF' ? '1px solid var(--gray-200)' : '2px solid rgba(255,255,255,0.80)',
                }}
                onClick={() => handleSolidSelect(color)}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleSolidSelect(e.target.value)}
              style={{
                width: 36,
                height: 36,
                border: '1px solid var(--gray-200)',
                borderRadius: 10,
                cursor: 'pointer',
                padding: 2,
              }}
            />
            <input
              className="input-field input-mono"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                  handleSolidSelect(e.target.value);
                }
              }}
              placeholder="#FFFFFF"
              style={{ flex: 1 }}
            />
          </div>
        </div>
      )}

      {activeTab === 'gradient' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
            }}
          >
            {GRADIENT_PRESETS.map((g) => (
              <button
                key={g.name}
                onClick={() => handleGradientPreset(g.start, g.end, g.direction)}
                style={{
                  height: 40,
                  borderRadius: 10,
                  border:
                    state.background.gradientStart === g.start &&
                    state.background.gradientEnd === g.end
                      ? '2px solid var(--accent-primary)'
                      : '1px solid var(--gray-200)',
                  background: `linear-gradient(${g.direction}, ${g.start}, ${g.end})`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    left: 8,
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.9)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {g.name}
                </span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="color"
              value={gradStart}
              onChange={(e) => {
                setGradStart(e.target.value);
                setBackground({
                  ...state.background,
                  type: 'gradient',
                  gradientStart: e.target.value,
                });
              }}
              style={{
                width: 36,
                height: 36,
                border: '1px solid var(--gray-200)',
                borderRadius: 10,
                cursor: 'pointer',
                padding: 2,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 24,
                borderRadius: 8,
                background: `linear-gradient(to right, ${gradStart}, ${gradEnd})`,
                border: '1px solid var(--gray-200)',
              }}
            />
            <input
              type="color"
              value={gradEnd}
              onChange={(e) => {
                setGradEnd(e.target.value);
                setBackground({
                  ...state.background,
                  type: 'gradient',
                  gradientEnd: e.target.value,
                });
              }}
              style={{
                width: 36,
                height: 36,
                border: '1px solid var(--gray-200)',
                borderRadius: 10,
                cursor: 'pointer',
                padding: 2,
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['to right', 'to bottom', 'to bottom right', 'to top right'].map((dir) => (
              <button
                key={dir}
                onClick={() => {
                  setGradDir(dir);
                  setBackground({ ...state.background, type: 'gradient', gradientDirection: dir });
                }}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  borderRadius: 8,
                  border:
                    state.background.gradientDirection === dir
                      ? '1px solid var(--accent-primary)'
                      : '1px solid var(--gray-200)',
                  background:
                    state.background.gradientDirection === dir
                      ? 'var(--accent-primary-soft)'
                      : 'transparent',
                  color:
                    state.background.gradientDirection === dir
                      ? 'var(--accent-primary)'
                      : 'var(--gray-500)',
                  cursor: 'pointer',
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.15s ease',
                }}
              >
                {dir.replace('to ', '')}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                setGradType('linear');
                setBackground({ ...state.background, type: 'gradient', gradientType: 'linear' });
              }}
              className={gradType === 'linear' ? 'btn-primary' : 'btn-ghost'}
              style={{ flex: 1, fontSize: 12, padding: '6px 12px' }}
            >
              Linear
            </button>
            <button
              onClick={() => {
                setGradType('radial');
                setBackground({ ...state.background, type: 'gradient', gradientType: 'radial' });
              }}
              className={gradType === 'radial' ? 'btn-primary' : 'btn-ghost'}
              style={{ flex: 1, fontSize: 12, padding: '6px 12px' }}
            >
              Radial
            </button>
          </div>
        </div>
      )}

      {activeTab === 'image' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ImageUploader onImageUpload={handleImageUpload} />
          {state.background.type === 'image' && state.background.imageUrl && (
            <div
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid var(--gray-200)',
              }}
            >
              <img
                src={state.background.imageUrl}
                alt="Background preview"
                style={{
                  width: '100%',
                  height: 80,
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
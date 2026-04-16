'use client';

import React from 'react';
import { useEditor, useEditorActions } from '@/store/context';
import { TEMPLATE_PRESETS, getBackgroundCSS } from '@/lib/constants';
import { BackgroundConfig } from '@/types/editor';

export function TemplatePanel() {
  const { state } = useEditor();
  const { setBackground } = useEditorActions();

  const handleSelectTemplate = (templateBg: BackgroundConfig) => {
    setBackground({ ...templateBg });
  };

  const categories = [...new Set(TEMPLATE_PRESETS.map((t) => t.category))];

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
        Templates
      </div>
      {categories.map((category) => (
        <div key={category} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--gray-600)' }}>
            {category}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
            }}
          >
            {TEMPLATE_PRESETS.filter((t) => t.category === category).map((template) => {
              const bgCSS = getBackgroundCSS(template.background);
              return (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template.background)}
                  style={{
                    borderRadius: 12,
                    border:
                      state.background.type === template.background.type &&
                      state.background.solidColor === template.background.solidColor &&
                      state.background.gradientStart === template.background.gradientStart
                        ? '2px solid var(--accent-primary)'
                        : '1px solid var(--gray-200)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'none',
                    padding: 0,
                    transition: 'all 0.15s ease',
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
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      background: bgCSS,
                      borderRadius: '11px 11px 0 0',
                    }}
                  />
                  <div
                    style={{
                      padding: '6px 8px',
                      fontSize: 11,
                      color: 'var(--gray-600)',
                      background: 'var(--surface-base)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {template.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
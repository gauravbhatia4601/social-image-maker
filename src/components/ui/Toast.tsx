'use client';

import React from 'react';
import { useEditor, useEditorActions } from '@/store/context';

export function Toast() {
  const { state } = useEditor();
  const { showToast } = state;

  if (!showToast) return null;

  const typeColors = {
    success: 'var(--accent-success)',
    error: 'var(--accent-error)',
    info: 'var(--accent-tertiary)',
  };

  return (
    <div
      className="toast-enter"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.60)',
        borderRadius: 14,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        zIndex: 9999,
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--gray-700)',
        maxWidth: 360,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: typeColors[showToast.type],
          flexShrink: 0,
        }}
      />
      {showToast.message}
    </div>
  );
}
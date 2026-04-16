'use client';

import React, { useCallback, useState } from 'react';
import { useEditor, useEditorActions } from '@/store/context';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants';
import {
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  Bold,
  Italic,
  ChevronDown,
} from 'lucide-react';

export function TextPropertiesPanel() {
  const { state } = useEditor();
  const { updateText, removeText, selectText } = useEditorActions();

  const selectedElement = state.textElements.find((el) => el.id === state.selectedTextId);

  const [fontSearch, setFontSearch] = useState('');
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

  const filteredFonts = FONTS.filter((f) =>
    f.family.toLowerCase().includes(fontSearch.toLowerCase())
  );

  const handleUpdate = useCallback(
    (updates: Record<string, unknown>) => {
      if (!selectedElement) return;
      updateText(selectedElement.id, updates);
    },
    [selectedElement, updateText]
  );

  if (!selectedElement) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          gap: 12,
          color: 'var(--gray-400)',
        }}
      >
        <Type size={24} />
        <span style={{ fontSize: 12 }}>Select a text element to edit</span>
      </div>
    );
  }

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
        Text Properties
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <textarea
          className="input-field"
          value={selectedElement.text}
          onChange={(e) => handleUpdate({ text: e.target.value })}
          rows={3}
          style={{ resize: 'vertical', minHeight: 60 }}
          placeholder="Enter your text..."
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
        <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500 }}>Font</label>
        <button
          onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.60)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--gray-200)',
            borderRadius: 10,
            cursor: 'pointer',
            fontFamily: selectedElement.fontFamily,
            fontSize: 13,
            color: 'var(--gray-700)',
            width: '100%',
          }}
        >
          <span>{selectedElement.fontFamily}</span>
          <ChevronDown size={14} style={{ color: 'var(--gray-400)' }} />
        </button>

        {fontDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 100,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--gray-200)',
              borderRadius: 12,
              maxHeight: 200,
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
            }}
            className="scrollbar-thin"
          >
            <input
              className="input-field"
              placeholder="Search fonts..."
              value={fontSearch}
              onChange={(e) => setFontSearch(e.target.value)}
              style={{ margin: 8, width: 'calc(100% - 16px)', fontSize: 12 }}
              autoFocus
            />
            {filteredFonts.map((font) => (
              <button
                key={font.family}
                onClick={() => {
                  handleUpdate({ fontFamily: font.family });
                  setFontDropdownOpen(false);
                  setFontSearch('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  border: 'none',
                  background:
                    selectedElement.fontFamily === font.family
                      ? 'var(--accent-primary-soft)'
                      : 'transparent',
                  color:
                    selectedElement.fontFamily === font.family
                      ? 'var(--accent-primary)'
                      : 'var(--gray-600)',
                  cursor: 'pointer',
                  width: '100%',
                  fontFamily: font.family,
                  fontSize: 13,
                  transition: 'background 0.1s ease',
                }}
                onMouseEnter={(e) => {
                  if (selectedElement.fontFamily !== font.family) {
                    e.currentTarget.style.background = 'var(--gray-50)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedElement.fontFamily !== font.family) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{font.family}</span>
                <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-body)' }}>
                  {font.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500, display: 'block', marginBottom: 4 }}>
            Size
          </label>
          <input
            type="number"
            className="input-field input-mono"
            value={selectedElement.fontSize}
            onChange={(e) => handleUpdate({ fontSize: Number(e.target.value) })}
            min={8}
            max={200}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500, display: 'block', marginBottom: 4 }}>
            Weight
          </label>
          <select
            className="input-field"
            value={selectedElement.fontWeight}
            onChange={(e) => handleUpdate({ fontWeight: Number(e.target.value) })}
            style={{ padding: '8px 8px' }}
          >
            {FONT_WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500, whiteSpace: 'nowrap' }}>
          Color
        </label>
        <input
          type="color"
          value={selectedElement.fontColor}
          onChange={(e) => handleUpdate({ fontColor: e.target.value })}
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
          value={selectedElement.fontColor}
          onChange={(e) => {
            if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
              handleUpdate({ fontColor: e.target.value });
            }
          }}
          style={{ flex: 1 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500, lineHeight: '36px' }}>
          Style
        </label>
        <button
          onClick={() =>
            handleUpdate({
              fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic',
            })
          }
          className={selectedElement.fontStyle === 'italic' ? 'tool-btn active' : 'tool-btn'}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div style={{ width: 1, background: 'var(--gray-200)', margin: '4px 2px' }} />
        {(['left', 'center', 'right'] as const).map((align) => (
          <button
            key={align}
            onClick={() => handleUpdate({ textAlign: align })}
            className={selectedElement.textAlign === align ? 'tool-btn active' : 'tool-btn'}
            title={`Align ${align}`}
          >
            {align === 'left' && <AlignLeft size={16} />}
            {align === 'center' && <AlignCenter size={16} />}
            {align === 'right' && <AlignRight size={16} />}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500, display: 'block', marginBottom: 4 }}>
            X Position
          </label>
          <input
            type="number"
            className="input-field input-mono"
            value={Math.round(selectedElement.x)}
            onChange={(e) => handleUpdate({ x: Number(e.target.value) })}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500, display: 'block', marginBottom: 4 }}>
            Y Position
          </label>
          <input
            type="number"
            className="input-field input-mono"
            value={Math.round(selectedElement.y)}
            onChange={(e) => handleUpdate({ y: Number(e.target.value) })}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 500, display: 'block', marginBottom: 4 }}>
            Rotation
          </label>
          <input
            type="number"
            className="input-field input-mono"
            value={Math.round(selectedElement.rotation)}
            onChange={(e) => handleUpdate({ rotation: Number(e.target.value) })}
            min={-360}
            max={360}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={() => {
              removeText(selectedElement.id);
              selectText(null);
            }}
            className="btn-ghost"
            style={{
              color: 'var(--accent-error)',
              borderColor: 'rgba(239,68,68,0.3)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              fontSize: 12,
            }}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
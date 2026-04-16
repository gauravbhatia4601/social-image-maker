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
  Italic,
  ChevronDown,
  Palette,
  Sun,
  Pen,
} from 'lucide-react';

export function TextPropertiesPanel() {
  const { state } = useEditor();
  const { updateText, removeText, selectText } = useEditorActions();

  const selectedElement = state.textElements.find((el) => el.id === state.selectedTextId);

  const [fontSearch, setFontSearch] = useState('');
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [effectsOpen, setEffectsOpen] = useState(false);

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

  const labelStyle: React.CSSProperties = {
    fontSize: 10,
    color: 'var(--gray-500)',
    fontWeight: 500,
    display: 'block',
    marginBottom: 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    width: '100%',
  };

  const fieldStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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

      <div>
        <textarea
          className="input-field"
          value={selectedElement.text}
          onChange={(e) => handleUpdate({ text: e.target.value })}
          rows={3}
          style={{ resize: 'vertical', minHeight: 60, width: '100%', boxSizing: 'border-box' }}
          placeholder="Enter your text..."
        />
      </div>

      <div style={{ position: 'relative' }}>
        <label style={labelStyle}>Font</label>
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
            boxSizing: 'border-box',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedElement.fontFamily}</span>
          <ChevronDown size={14} style={{ color: 'var(--gray-400)', flexShrink: 0 }} />
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
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
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
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{font.family}</span>
                <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-body)', flexShrink: 0, marginLeft: 8 }}>
                  {font.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Size</label>
          <input
            type="number"
            className="input-field input-mono"
            value={selectedElement.fontSize}
            onChange={(e) => handleUpdate({ fontSize: Number(e.target.value) })}
            min={8}
            max={200}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Weight</label>
          <select
            className="input-field"
            value={selectedElement.fontWeight}
            onChange={(e) => handleUpdate({ fontWeight: Number(e.target.value) })}
            style={{ padding: '8px 6px' }}
          >
            {FONT_WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>{w.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
        <label style={{ ...labelStyle, marginBottom: 0, lineHeight: '36px', flexShrink: 0 }}>Color</label>
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
            flexShrink: 0,
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
          style={{ flex: 1, minWidth: 0 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <label style={{ ...labelStyle, marginBottom: 0, lineHeight: '36px', flexShrink: 0 }}>Style</label>
        <button
          onClick={() =>
            handleUpdate({ fontStyle: selectedElement.fontStyle === 'italic' ? 'normal' : 'italic' })
          }
          className={selectedElement.fontStyle === 'italic' ? 'tool-btn active' : 'tool-btn'}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div style={{ width: 1, height: 20, background: 'var(--gray-200)', margin: '4px 2px' }} />
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

      <div style={rowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>X</label>
          <input
            type="number"
            className="input-field input-mono"
            value={Math.round(selectedElement.x)}
            onChange={(e) => handleUpdate({ x: Number(e.target.value) })}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Y</label>
          <input
            type="number"
            className="input-field input-mono"
            value={Math.round(selectedElement.y)}
            onChange={(e) => handleUpdate({ y: Number(e.target.value) })}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Rotation</label>
          <input
            type="number"
            className="input-field input-mono"
            value={Math.round(selectedElement.rotation)}
            onChange={(e) => handleUpdate({ rotation: Number(e.target.value) })}
            min={-360}
            max={360}
          />
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--gray-200)',
          paddingTop: 12,
          marginTop: 4,
        }}
      >
        <button
          onClick={() => setEffectsOpen(!effectsOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--gray-700)',
            padding: '4px 0',
          }}
        >
          <Sun size={14} style={{ color: 'var(--accent-secondary)' }} />
          Text Effects
          <ChevronDown
            size={14}
            style={{
              color: 'var(--gray-400)',
              transform: effectsOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>

        {effectsOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 11, color: 'var(--gray-600)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Palette size={12} /> Gradient Fill
                </label>
                <button
                  onClick={() => handleUpdate({ fillGradientEnable: !selectedElement.fillGradientEnable })}
                  className={selectedElement.fillGradientEnable ? 'tool-btn active' : 'tool-btn'}
                  style={{ width: 28, height: 24, fontSize: 10 }}
                >
                  {selectedElement.fillGradientEnable ? 'On' : 'Off'}
                </button>
              </div>
              {selectedElement.fillGradientEnable && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={selectedElement.fillGradientStart}
                    onChange={(e) => handleUpdate({ fillGradientStart: e.target.value })}
                    style={{ width: 32, height: 32, border: '1px solid var(--gray-200)', borderRadius: 8, cursor: 'pointer', padding: 2 }}
                  />
                  <div style={{
                    flex: 1, height: 20, borderRadius: 6,
                    background: `linear-gradient(to right, ${selectedElement.fillGradientStart}, ${selectedElement.fillGradientEnd})`,
                    border: '1px solid var(--gray-200)',
                  }} />
                  <input
                    type="color"
                    value={selectedElement.fillGradientEnd}
                    onChange={(e) => handleUpdate({ fillGradientEnd: e.target.value })}
                    style={{ width: 32, height: 32, border: '1px solid var(--gray-200)', borderRadius: 8, cursor: 'pointer', padding: 2 }}
                  />
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 11, color: 'var(--gray-600)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sun size={12} /> Shadow
                </label>
                <button
                  onClick={() => handleUpdate({ textShadowEnabled: !selectedElement.textShadowEnabled })}
                  className={selectedElement.textShadowEnabled ? 'tool-btn active' : 'tool-btn'}
                  style={{ width: 28, height: 24, fontSize: 10 }}
                >
                  {selectedElement.textShadowEnabled ? 'On' : 'Off'}
                </button>
              </div>
              {selectedElement.textShadowEnabled && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={selectedElement.textShadowColor}
                    onChange={(e) => handleUpdate({ textShadowColor: e.target.value })}
                    style={{ width: 32, height: 32, border: '1px solid var(--gray-200)', borderRadius: 8, cursor: 'pointer', padding: 2 }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)', width: 28 }}>Blur</span>
                      <input type="range" min={0} max={20} value={selectedElement.textShadowBlur}
                        onChange={(e) => handleUpdate({ textShadowBlur: Number(e.target.value) })}
                        style={{ flex: 1 }} />
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gray-500)', width: 20 }}>{selectedElement.textShadowBlur}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 11, color: 'var(--gray-600)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Pen size={12} /> Outline
                </label>
                <button
                  onClick={() => handleUpdate({ textStrokeEnabled: !selectedElement.textStrokeEnabled })}
                  className={selectedElement.textStrokeEnabled ? 'tool-btn active' : 'tool-btn'}
                  style={{ width: 28, height: 24, fontSize: 10 }}
                >
                  {selectedElement.textStrokeEnabled ? 'On' : 'Off'}
                </button>
              </div>
              {selectedElement.textStrokeEnabled && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={selectedElement.textStrokeColor}
                    onChange={(e) => handleUpdate({ textStrokeColor: e.target.value })}
                    style={{ width: 32, height: 32, border: '1px solid var(--gray-200)', borderRadius: 8, cursor: 'pointer', padding: 2 }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)', width: 28 }}>Width</span>
                      <input type="range" min={1} max={10} value={selectedElement.textStrokeWidth}
                        onChange={(e) => handleUpdate({ textStrokeWidth: Number(e.target.value) })}
                        style={{ flex: 1 }} />
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--gray-500)', width: 20 }}>{selectedElement.textStrokeWidth}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={rowStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Spacing</label>
                <input
                  type="number"
                  className="input-field input-mono"
                  value={selectedElement.letterSpacing || 0}
                  onChange={(e) => handleUpdate({ letterSpacing: Number(e.target.value) })}
                  min={-5}
                  max={50}
                  step={0.5}
                />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Line Height</label>
                <input
                  type="number"
                  className="input-field input-mono"
                  value={selectedElement.lineHeight || 1.2}
                  onChange={(e) => handleUpdate({ lineHeight: Number(e.target.value) })}
                  min={0.5}
                  max={3}
                  step={0.1}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 12, marginTop: 4 }}>
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
          Delete Text
        </button>
      </div>
    </div>
  );
}
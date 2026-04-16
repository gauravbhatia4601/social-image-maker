'use client';

import React, { useState, useCallback, useRef } from 'react';
import Konva from 'konva';
import dynamic from 'next/dynamic';
import { EditorProvider, useEditor, useEditorActions } from '@/store/context';
import { PresetPanel } from '@/components/panels/PresetPanel';
import { TemplatePanel } from '@/components/panels/TemplatePanel';
import { BackgroundPanel } from '@/components/panels/BackgroundPanel';
import { TextPropertiesPanel } from '@/components/panels/TextPropertiesPanel';
import { ExportPanel } from '@/components/panels/ExportPanel';
import { Toast } from '@/components/ui/Toast';
import { generateId, INSPIRATIONAL_QUOTES } from '@/lib/constants';
import {
  Sparkles,
  Type,
  MousePointer2,
  Download,
  Undo2,
  Redo2,
  Quote,
  Layers,
  LayoutGrid,
  Droplets,
  X,
} from 'lucide-react';

const CanvasEditor = dynamic(
  () => import('@/components/canvas/CanvasEditor').then((mod) => mod.CanvasEditor),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--canvas-bg)',
        }}
      >
        <div className="loading-orb" />
      </div>
    ),
  }
);

function EditorContent() {
  const { state } = useEditor();
  const {
    addText,
    setTool,
    undo,
    redo,
    showToast,
    setLeftPanel,
    setRightPanel,
    selectText,
  } = useEditorActions();
  const stageRef = useRef<Konva.Stage | null>(null);
  const [showExport, setShowExport] = useState(false);

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  const handleAddText = useCallback(() => {
    const id = generateId();
    addText({
      id,
      type: 'text',
      text: 'Your text here',
      x: state.canvasWidth / 2 - 100,
      y: state.canvasHeight / 2 - 30,
      fontSize: 48,
      fontFamily: 'Inter',
      fontColor: '#000000',
      fontWeight: 600,
      fontStyle: 'normal',
      textAlign: 'center',
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      fillGradientEnable: false,
      fillGradientStart: '#6366F1',
      fillGradientEnd: '#06B6D4',
      textShadowEnabled: false,
      textShadowColor: '#000000',
      textShadowBlur: 4,
      textShadowOffsetX: 2,
      textShadowOffsetY: 2,
      textStrokeEnabled: false,
      textStrokeColor: '#000000',
      textStrokeWidth: 1,
      letterSpacing: 0,
      lineHeight: 1.2,
    });
    selectText(id);
    setTool('select');
    showToast('Text added! Double-click to edit.', 'info');
  }, [addText, state.canvasWidth, state.canvasHeight, selectText, setTool, showToast]);

  const handleAddQuote = useCallback(() => {
    const quote = INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)];
    const id = generateId();
    addText({
      id,
      type: 'text',
      text: quote.text,
      x: state.canvasWidth / 2 - 200,
      y: state.canvasHeight / 2 - 60,
      fontSize: 36,
      fontFamily: 'Playfair Display',
      fontColor: state.background.type === 'solid' && state.background.solidColor === '#FFFFFF' ? '#161A2B' : '#FFFFFF',
      fontWeight: 500,
      fontStyle: 'italic',
      textAlign: 'center',
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      fillGradientEnable: false,
      fillGradientStart: '#6366F1',
      fillGradientEnd: '#06B6D4',
      textShadowEnabled: false,
      textShadowColor: '#000000',
      textShadowBlur: 4,
      textShadowOffsetX: 2,
      textShadowOffsetY: 2,
      textStrokeEnabled: false,
      textStrokeColor: '#000000',
      textStrokeWidth: 1,
      letterSpacing: 0,
      lineHeight: 1.4,
    });
    selectText(id);
    setTool('select');
    showToast('Quote added!', 'success');
  }, [addText, state.canvasWidth, state.canvasHeight, state.background, selectText, setTool, showToast]);

  const leftPanelItems = [
    { id: 'presets' as const, icon: <LayoutGrid size={18} />, label: 'Canvas' },
    { id: 'templates' as const, icon: <Layers size={18} />, label: 'Templates' },
    { id: 'background' as const, icon: <Droplets size={18} />, label: 'BG' },
  ];

  return (
    <div
      className="workspace-bg"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="glass-panel"
        style={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '6px 8px',
          zIndex: 100,
          borderRadius: 999,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 12px',
            borderRight: '1px solid var(--gray-200)',
            marginRight: 4,
          }}
        >
          <Sparkles size={18} style={{ color: 'var(--accent-primary)' }} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 14,
              color: 'var(--gray-800)',
              letterSpacing: '-0.02em',
            }}
          >
            SocialCraft
          </span>
        </div>

        <button
          className={`tool-btn ${state.activeTool === 'select' ? 'active' : ''}`}
          onClick={() => setTool('select')}
          title="Select tool (V)"
          style={{ width: 34, height: 34 }}
        >
          <MousePointer2 size={16} />
        </button>

        <button
          className={`tool-btn ${state.activeTool === 'text' ? 'active' : ''}`}
          onClick={handleAddText}
          title="Add text (T)"
          style={{ width: 34, height: 34 }}
        >
          <Type size={16} />
        </button>

        <button
          className="tool-btn"
          onClick={handleAddQuote}
          title="Add inspirational quote"
          style={{ width: 34, height: 34 }}
        >
          <Quote size={16} />
        </button>

        <div style={{ width: 1, height: 20, background: 'var(--gray-200)', margin: '0 4px' }} />

        <button
          className="tool-btn"
          onClick={undo}
          title="Undo (Ctrl+Z)"
          style={{ width: 34, height: 34, opacity: canUndo ? 1 : 0.35 }}
          disabled={!canUndo}
        >
          <Undo2 size={16} />
        </button>

        <button
          className="tool-btn"
          onClick={redo}
          title="Redo (Ctrl+Shift+Z)"
          style={{ width: 34, height: 34, opacity: canRedo ? 1 : 0.35 }}
          disabled={!canRedo}
        >
          <Redo2 size={16} />
        </button>

        <div style={{ width: 1, height: 20, background: 'var(--gray-200)', margin: '0 4px' }} />

        <button
          className="tool-btn"
          onClick={() => setShowExport(true)}
          title="Export image"
          style={{ width: 34, height: 34 }}
        >
          <Download size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <div
          style={{
            width: 52,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            paddingTop: 72,
            paddingBottom: 16,
            zIndex: 50,
          }}
        >
          {leftPanelItems.map((item) => (
            <button
              key={item.id}
              className={`tool-btn ${state.leftPanel === item.id ? 'active' : ''}`}
              onClick={() =>
                setLeftPanel(state.leftPanel === item.id ? null : item.id)
              }
              title={item.label}
              style={{
                width: 40,
                height: 40,
                position: 'relative',
              }}
            >
              {item.icon}
              <span
                style={{
                  position: 'absolute',
                  bottom: -2,
                  fontSize: 9,
                  color: state.leftPanel === item.id ? 'var(--accent-primary)' : 'var(--gray-400)',
                  fontWeight: 500,
                }}
              >
                {item.label.length > 3 ? item.label.slice(0, 2) : item.label}
              </span>
            </button>
          ))}
        </div>

        {state.leftPanel && (
          <div
            className="glass-panel panel-enter"
            style={{
              width: 264,
              height: 'calc(100vh - 80px)',
              marginTop: 60,
              marginLeft: 4,
              padding: 16,
              overflow: 'hidden',
              zIndex: 40,
              flexShrink: 0,
            }}
          >
            <div className="scrollbar-thin" style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {state.leftPanel === 'presets' && <PresetPanel />}
            {state.leftPanel === 'templates' && <TemplatePanel />}
            {state.leftPanel === 'background' && <BackgroundPanel />}
            </div>
          </div>
        )}

        <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
          <div style={{ paddingTop: 56, height: '100%' }}>
            <CanvasEditor stageRef={stageRef} />
          </div>
        </div>

        {state.rightPanelOpen && state.selectedTextId && (
          <div
            className="glass-panel panel-enter"
            style={{
              width: 276,
              height: 'calc(100vh - 80px)',
              marginTop: 60,
              marginRight: 4,
              padding: 16,
              overflow: 'hidden',
              zIndex: 40,
              flexShrink: 0,
            }}
          >
            <div className="scrollbar-thin" style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--gray-500)',
                }}
              >
                Properties
              </span>
              <button
                className="tool-btn"
                onClick={() => { selectText(null); setRightPanel(false); }}
                style={{ width: 28, height: 28 }}
              >
                <X size={14} />
              </button>
            </div>
            <TextPropertiesPanel />
            </div>
          </div>
        )}
      </div>

      <Toast />

      {showExport && (
        <ExportPanel stageRef={stageRef} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
}
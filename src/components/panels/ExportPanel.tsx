'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useEditor, useEditorActions } from '@/store/context';
import { Download, Image, FileImage, X, Loader2 } from 'lucide-react';
import Konva from 'konva';

interface ExportPanelProps {
  stageRef: React.RefObject<Konva.Stage | null>;
  onClose: () => void;
}

export function ExportPanel({ stageRef, onClose }: ExportPanelProps) {
  const { state } = useEditor();
  const { showToast } = useEditorActions();
  const [exportFormat, setExportFormat] = React.useState<'png' | 'jpeg'>('png');
  const [quality, setQuality] = React.useState(1);
  const [scale, setScale] = React.useState(2);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const generatePreview = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    try {
      const oldScaleX = stage.scaleX();
      const oldScaleY = stage.scaleY();
      const oldX = stage.x();
      const constY = stage.y();

      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });

      const url = stage.toDataURL({
        pixelRatio: 1,
        x: 0,
        y: 0,
        width: state.canvasWidth,
        height: state.canvasHeight,
      });

      stage.scale({ x: oldScaleX, y: oldScaleY });
      stage.position({ x: oldX, y: constY });
      stage.batchDraw();

      setPreviewUrl(url);
    } catch {
      setPreviewUrl(null);
    }
  }, [stageRef, state.canvasWidth, state.canvasHeight]);

  useEffect(() => {
    generatePreview();
  }, [generatePreview]);

  const handleExport = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    setExporting(true);

    setTimeout(() => {
      try {
        const oldScaleX = stage.scaleX();
        const oldScaleY = stage.scaleY();
        const oldX = stage.x();
        const oldY = stage.y();

        stage.scale({ x: scale, y: scale });
        stage.position({ x: 0, y: 0 });

        const dataURL = stage.toDataURL({
          pixelRatio: 1,
          mimeType: exportFormat === 'jpeg' ? 'image/jpeg' : 'image/png',
          quality: exportFormat === 'jpeg' ? quality : 1,
          x: 0,
          y: 0,
          width: state.canvasWidth * scale,
          height: state.canvasHeight * scale,
        });

        stage.scale({ x: oldScaleX, y: oldScaleY });
        stage.position({ x: oldX, y: oldY });
        stage.batchDraw();

        const link = document.createElement('a');
        link.download = `socialcraft-${state.canvasWidth}x${state.canvasHeight}.${exportFormat}`;
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Image downloaded!', 'success');
        onClose();
      } catch (err) {
        showToast('Export failed. Try a different format.', 'error');
      } finally {
        setExporting(false);
      }
    }, 100);
  }, [stageRef, exportFormat, quality, scale, state.canvasWidth, state.canvasHeight, showToast, onClose]);

  const aspectRatio = state.canvasWidth / state.canvasHeight;
  const previewMaxW = 280;
  const previewMaxH = 220;
  let previewW, previewH;
  if (aspectRatio > previewMaxW / previewMaxH) {
    previewW = previewMaxW;
    previewH = previewMaxW / aspectRatio;
  } else {
    previewH = previewMaxH;
    previewW = previewMaxH * aspectRatio;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(248, 249, 252, 0.80)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />
      <div
        className="glass-panel-elevated panel-enter"
        style={{
          position: 'relative',
          width: 480,
          maxHeight: '90vh',
          overflow: 'auto',
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--gray-800)',
                letterSpacing: '-0.02em',
              }}
            >
              Export Image
            </h2>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>
              {state.canvasWidth} × {state.canvasHeight}px
            </p>
          </div>
          <button
            onClick={onClose}
            className="tool-btn"
            style={{ width: 32, height: 32 }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            background: 'var(--gray-50)',
            borderRadius: 14,
            border: '1px solid var(--gray-100)',
          }}
        >
          <div
            style={{
              width: previewW,
              height: previewH,
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
              border: '1px solid var(--gray-200)',
              background: '#fff',
              position: 'relative',
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0',
              }}>
                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Generating preview...</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--gray-500)',
                display: 'block',
                marginBottom: 8,
              }}
            >
              Format
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setExportFormat('png')}
                className={exportFormat === 'png' ? 'btn-primary' : 'btn-ghost'}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '10px 16px',
                }}
              >
                <FileImage size={16} />
                PNG
              </button>
              <button
                onClick={() => setExportFormat('jpeg')}
                className={exportFormat === 'jpeg' ? 'btn-primary' : 'btn-ghost'}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '10px 16px',
                }}
              >
                <Image size={16} />
                JPEG
              </button>
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--gray-500)',
                display: 'block',
                marginBottom: 8,
              }}
            >
              Scale
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setScale(s)}
                  className={scale === s ? 'btn-primary' : 'btn-ghost'}
                  style={{
                    flex: 1,
                    fontSize: 12,
                    padding: '10px 8px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {s}x
                  <span style={{ display: 'block', fontSize: 10, color: 'inherit', opacity: 0.6, marginTop: 2 }}>
                    {state.canvasWidth * s}×{state.canvasHeight * s}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {exportFormat === 'jpeg' && (
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--gray-500)',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                Quality: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.1}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="btn-primary"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '14px 20px',
            fontSize: 14,
            fontWeight: 600,
            opacity: exporting ? 0.7 : 1,
          }}
        >
          {exporting ? (
            <>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              Exporting...
            </>
          ) : (
            <>
              <Download size={18} />
              Download {exportFormat.toUpperCase()}
            </>
          )}
        </button>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
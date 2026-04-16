'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Stage, Layer, Rect, Text, Transformer, Image as KonvaImage } from 'react-konva';
import Konva from 'konva';
import { useEditor, useEditorActions } from '@/store/context';
import { TextElement } from '@/types/editor';

interface CanvasEditorProps {
  stageRef: React.RefObject<Konva.Stage | null>;
}

function EditableText({
  element,
  isSelected,
  onSelect,
  onChange,
}: {
  element: TextElement;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (updates: Partial<TextElement>) => void;
}) {
  const textRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Text
        ref={textRef}
        id={element.id}
        text={element.text}
        x={element.x}
        y={element.y}
        fontSize={element.fontSize}
        fontFamily={element.fontFamily}
        fill={element.fontColor}
        fontStyle={`${element.fontWeight} ${element.fontStyle === 'italic' ? 'italic' : 'normal'}`}
        fontWeight={element.fontWeight}
        align={element.textAlign as 'left' | 'center' | 'right'}
        rotation={element.rotation}
        scaleX={1}
        scaleY={1}
        draggable={isSelected}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = textRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            fontSize: Math.max(8, element.fontSize * Math.max(scaleX, scaleY)),
            rotation: node.rotation(),
          });
        }}
        wrap="word"
        width={300}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) return oldBox;
            return newBox;
          }}
          rotateEnabled={true}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          borderStroke="#6366F1"
          borderStrokeWidth={1.5}
          borderDash={[4, 4]}
          anchorStroke="#6366F1"
          anchorFill="white"
          anchorSize={8}
          anchorCornerRadius={4}
        />
      )}
    </>
  );
}

function getGradientPoints(direction: string, w: number, h: number) {
  switch (direction) {
    case 'to right': return { start: { x: 0, y: h / 2 }, end: { x: w, y: h / 2 } };
    case 'to bottom': return { start: { x: w / 2, y: 0 }, end: { x: w / 2, y: h } };
    case 'to bottom right': return { start: { x: 0, y: 0 }, end: { x: w, y: h } };
    case 'to top right': return { start: { x: 0, y: h }, end: { x: w, y: 0 } };
    default: return { start: { x: 0, y: 0 }, end: { x: w, y: h } };
  }
}

export function CanvasEditor({ stageRef }: CanvasEditorProps) {
  const { state } = useEditor();
  const { updateText, selectText } = useEditorActions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (state.background.type === 'image' && state.background.imageUrl) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => setBgImage(img);
      img.src = state.background.imageUrl;
    } else {
      setBgImage(null);
    }
  }, [state.background.type, state.background.imageUrl]);

  const scale = Math.min(
    (containerSize.width - 80) / state.canvasWidth,
    (containerSize.height - 80) / state.canvasHeight,
    1
  );

  const offsetX = (containerSize.width - state.canvasWidth * scale) / 2;
  const offsetY = (containerSize.height - state.canvasHeight * scale) / 2;

  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty =
        e.target === e.target.getStage() ||
        e.target.name() === 'canvas-bg' ||
        e.target.name() === 'canvas-bg-grad' ||
        e.target.name() === 'canvas-bg-img';
      if (clickedOnEmpty) {
        selectText(null);
      }
    },
    [selectText]
  );

  const bgFill = state.background.type === 'solid' ? state.background.solidColor : '#FFFFFF';
  const hasGradient = state.background.type === 'gradient';
  const hasImage = state.background.type === 'image' && bgImage;

  const gradientPoints = getGradientPoints(
    state.background.gradientDirection,
    state.canvasWidth,
    state.canvasHeight
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--gray-300) 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.2,
          pointerEvents: 'none',
        }}
      />

      <Stage
        ref={stageRef}
        width={containerSize.width}
        height={containerSize.height}
        scaleX={scale}
        scaleY={scale}
        x={offsetX}
        y={offsetY}
        onClick={handleStageClick}
        onTap={handleStageClick as any}
      >
        <Layer>
          <Rect
            name="canvas-bg"
            x={0}
            y={0}
            width={state.canvasWidth}
            height={state.canvasHeight}
            fill={bgFill}
            shadowColor="rgba(0,0,0,0.08)"
            shadowBlur={20}
            shadowOffset={{ x: 0, y: 4 }}
            shadowOpacity={0.15}
          />

          {hasGradient && (
            <Rect
              name="canvas-bg-grad"
              x={0}
              y={0}
              width={state.canvasWidth}
              height={state.canvasHeight}
              fillLinearGradientStartPoint={gradientPoints.start}
              fillLinearGradientEndPoint={gradientPoints.end}
              fillLinearGradientColorStops={[
                0, state.background.gradientStart,
                1, state.background.gradientEnd,
              ]}
            />
          )}

          {hasImage && bgImage && (
            <KonvaImage
              name="canvas-bg-img"
              image={bgImage}
              x={0}
              y={0}
              width={state.canvasWidth}
              height={state.canvasHeight}
            />
          )}

          {state.textElements.map((element) => (
            <EditableText
              key={element.id}
              element={element}
              isSelected={state.selectedTextId === element.id}
              onSelect={() => selectText(element.id)}
              onChange={(updates) => updateText(element.id, updates)}
            />
          ))}
        </Layer>
      </Stage>

      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '6px 16px',
          background: 'rgba(255,255,255,0.70)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.60)',
          borderRadius: 999,
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--gray-500)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          pointerEvents: 'none',
        }}
      >
        <span>{state.canvasWidth} × {state.canvasHeight}</span>
        <span style={{ color: 'var(--gray-300)' }}>|</span>
        <span>{Math.round(scale * 100)}%</span>
      </div>
    </div>
  );
}
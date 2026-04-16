export interface CanvasPreset {
  id: string;
  name: string;
  platform: string;
  width: number;
  height: number;
  icon: string;
}

export interface TextElement {
  id: string;
  type: 'text';
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  fontWeight: number;
  fontStyle: string;
  textAlign: string;
  rotation: number;
  scaleX: number;
  scaleY: number;
}

export interface BackgroundConfig {
  type: 'solid' | 'gradient' | 'image' | 'template';
  solidColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: string;
  gradientType: 'linear' | 'radial';
  imageUrl: string;
  templateId: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  thumbnail: string;
  background: BackgroundConfig;
  category: string;
}

export interface EditorState {
  canvasWidth: number;
  canvasHeight: number;
  selectedPresetId: string;
  background: BackgroundConfig;
  textElements: TextElement[];
  selectedTextId: string | null;
  activeTool: 'select' | 'text';
  zoom: number;
  showToast: { message: string; type: 'success' | 'error' | 'info' } | null;
  leftPanel: 'presets' | 'templates' | 'background' | null;
  rightPanelOpen: boolean;
}

export type EditorAction =
  | { type: 'SET_CANVAS_SIZE'; width: number; height: number; presetId: string }
  | { type: 'SET_BACKGROUND'; background: BackgroundConfig }
  | { type: 'ADD_TEXT'; element: TextElement }
  | { type: 'UPDATE_TEXT'; id: string; updates: Partial<TextElement> }
  | { type: 'REMOVE_TEXT'; id: string }
  | { type: 'SELECT_TEXT'; id: string | null }
  | { type: 'SET_TOOL'; tool: 'select' | 'text' }
  | { type: 'SET_ZOOM'; zoom: number }
  | { type: 'SHOW_TOAST'; toast: { message: string; type: 'success' | 'error' | 'info' } }
  | { type: 'HIDE_TOAST' }
  | { type: 'SET_LEFT_PANEL'; panel: 'presets' | 'templates' | 'background' | null }
  | { type: 'SET_RIGHT_PANEL'; open: boolean }
  | { type: 'RESET_CANVAS' };
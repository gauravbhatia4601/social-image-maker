import { EditorState, EditorAction, BackgroundConfig } from '@/types/editor';

const defaultBackground: BackgroundConfig = {
  type: 'solid',
  solidColor: '#FFFFFF',
  gradientStart: '#6366F1',
  gradientEnd: '#06B6D4',
  gradientDirection: 'to right',
  gradientType: 'linear',
  imageUrl: '',
  templateId: '',
};

const MAX_HISTORY = 50;

function createHistoryEntry(state: EditorState) {
  return {
    textElements: state.textElements.map((el) => ({ ...el })),
    background: { ...state.background },
    canvasWidth: state.canvasWidth,
    canvasHeight: state.canvasHeight,
    selectedPresetId: state.selectedPresetId,
  };
}

export const initialState: EditorState = {
  canvasWidth: 1080,
  canvasHeight: 1080,
  selectedPresetId: 'ig-post',
  background: { ...defaultBackground },
  textElements: [],
  selectedTextId: null,
  activeTool: 'select',
  zoom: 1,
  showToast: null,
  leftPanel: 'presets',
  rightPanelOpen: false,
  history: [],
  historyIndex: -1,
  isEditing: false,
};

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_CANVAS_SIZE': {
      const newState = {
        ...state,
        canvasWidth: action.width,
        canvasHeight: action.height,
        selectedPresetId: action.presetId,
      };
      const history = state.history.slice(0, state.historyIndex + 1);
      history.push(createHistoryEntry(newState));
      if (history.length > MAX_HISTORY) history.shift();
      return { ...newState, history, historyIndex: history.length - 1 };
    }

    case 'SET_BACKGROUND': {
      const newState = { ...state, background: action.background };
      const history = state.history.slice(0, state.historyIndex + 1);
      history.push(createHistoryEntry(newState));
      if (history.length > MAX_HISTORY) history.shift();
      return { ...newState, history, historyIndex: history.length - 1 };
    }

    case 'ADD_TEXT': {
      const newState = { ...state, textElements: [...state.textElements, action.element] };
      const history = state.history.slice(0, state.historyIndex + 1);
      history.push(createHistoryEntry(newState));
      if (history.length > MAX_HISTORY) history.shift();
      return { ...newState, history, historyIndex: history.length - 1 };
    }

    case 'UPDATE_TEXT': {
      const newState = {
        ...state,
        textElements: state.textElements.map((el) =>
          el.id === action.id ? { ...el, ...action.updates } : el
        ),
      };
      const history = state.history.slice(0, state.historyIndex + 1);
      history.push(createHistoryEntry(newState));
      if (history.length > MAX_HISTORY) history.shift();
      return { ...newState, history, historyIndex: history.length - 1 };
    }

    case 'REMOVE_TEXT': {
      const newState = {
        ...state,
        textElements: state.textElements.filter((el) => el.id !== action.id),
        selectedTextId: state.selectedTextId === action.id ? null : state.selectedTextId,
      };
      const history = state.history.slice(0, state.historyIndex + 1);
      history.push(createHistoryEntry(newState));
      if (history.length > MAX_HISTORY) history.shift();
      return { ...newState, history, historyIndex: history.length - 1 };
    }

    case 'SELECT_TEXT':
      return { ...state, selectedTextId: action.id, rightPanelOpen: action.id !== null };

    case 'SET_TOOL':
      return { ...state, activeTool: action.tool };

    case 'SET_ZOOM':
      return { ...state, zoom: action.zoom };

    case 'SHOW_TOAST':
      return { ...state, showToast: action.toast };

    case 'HIDE_TOAST':
      return { ...state, showToast: null };

    case 'SET_LEFT_PANEL':
      return { ...state, leftPanel: action.panel };

    case 'SET_RIGHT_PANEL':
      return { ...state, rightPanelOpen: action.open };

    case 'UNDO': {
      if (state.historyIndex <= 0) return state;
      const prev = state.history[state.historyIndex - 1];
      return {
        ...state,
        textElements: prev.textElements.map((el) => ({ ...el })),
        background: { ...prev.background },
        canvasWidth: prev.canvasWidth,
        canvasHeight: prev.canvasHeight,
        selectedPresetId: prev.selectedPresetId,
        selectedTextId: null,
        rightPanelOpen: false,
        historyIndex: state.historyIndex - 1,
      };
    }

    case 'REDO': {
      if (state.historyIndex >= state.history.length - 1) return state;
      const next = state.history[state.historyIndex + 1];
      return {
        ...state,
        textElements: next.textElements.map((el) => ({ ...el })),
        background: { ...next.background },
        canvasWidth: next.canvasWidth,
        canvasHeight: next.canvasHeight,
        selectedPresetId: next.selectedPresetId,
        selectedTextId: null,
        rightPanelOpen: false,
        historyIndex: state.historyIndex + 1,
      };
    }

    case 'SAVE_HISTORY': {
      const history = state.history.slice(0, state.historyIndex + 1);
      history.push(createHistoryEntry(state));
      if (history.length > MAX_HISTORY) history.shift();
      return { ...state, history, historyIndex: history.length - 1 };
    }

    case 'SET_EDITING':
      return { ...state, isEditing: action.isEditing };

    default:
      return state;
  }
}
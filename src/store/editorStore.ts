import { EditorState, EditorAction, BackgroundConfig, TextElement } from '@/types/editor';

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
};

export function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_CANVAS_SIZE':
      return {
        ...state,
        canvasWidth: action.width,
        canvasHeight: action.height,
        selectedPresetId: action.presetId,
      };

    case 'SET_BACKGROUND':
      return { ...state, background: action.background };

    case 'ADD_TEXT':
      return { ...state, textElements: [...state.textElements, action.element] };

    case 'UPDATE_TEXT':
      return {
        ...state,
        textElements: state.textElements.map((el) =>
          el.id === action.id ? { ...el, ...action.updates } : el
        ),
      };

    case 'REMOVE_TEXT':
      return {
        ...state,
        textElements: state.textElements.filter((el) => el.id !== action.id),
        selectedTextId: state.selectedTextId === action.id ? null : state.selectedTextId,
      };

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

    case 'RESET_CANVAS':
      return {
        ...state,
        background: { ...defaultBackground },
        textElements: [],
        selectedTextId: null,
      };

    default:
      return state;
  }
}
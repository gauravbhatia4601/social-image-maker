'use client';

import React, { useReducer, useCallback, useEffect, useRef } from 'react';
import { EditorState, EditorAction } from '@/types/editor';
import { editorReducer, initialState } from '@/store/editorStore';

interface EditorContextType {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

export const EditorContext = React.createContext<EditorContextType>({
  state: initialState,
  dispatch: () => {},
});

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.showToast) {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'HIDE_TOAST' });
      }, 3000);
    }
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [state.showToast]);

  useEffect(() => {
    dispatch({ type: 'SAVE_HISTORY' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        dispatch({ type: 'UNDO' });
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'Z' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        dispatch({ type: 'REDO' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = React.useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within EditorProvider');
  return context;
}

export function useEditorActions() {
  const { dispatch } = useEditor();

  const setCanvasSize = useCallback(
    (width: number, height: number, presetId: string) =>
      dispatch({ type: 'SET_CANVAS_SIZE', width, height, presetId }),
    [dispatch]
  );

  const setBackground = useCallback(
    (background: EditorState['background']) =>
      dispatch({ type: 'SET_BACKGROUND', background }),
    [dispatch]
  );

  const addText = useCallback(
    (element: EditorState['textElements'][0]) =>
      dispatch({ type: 'ADD_TEXT', element }),
    [dispatch]
  );

  const updateText = useCallback(
    (id: string, updates: Partial<EditorState['textElements'][0]>) =>
      dispatch({ type: 'UPDATE_TEXT', id, updates }),
    [dispatch]
  );

  const removeText = useCallback(
    (id: string) => dispatch({ type: 'REMOVE_TEXT', id }),
    [dispatch]
  );

  const selectText = useCallback(
    (id: string | null) => dispatch({ type: 'SELECT_TEXT', id }),
    [dispatch]
  );

  const setTool = useCallback(
    (tool: 'select' | 'text') => dispatch({ type: 'SET_TOOL', tool }),
    [dispatch]
  );

  const undo = useCallback(
    () => dispatch({ type: 'UNDO' }),
    [dispatch]
  );

  const redo = useCallback(
    () => dispatch({ type: 'REDO' }),
    [dispatch]
  );

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') =>
      dispatch({ type: 'SHOW_TOAST', toast: { message, type } }),
    [dispatch]
  );

  const setLeftPanel = useCallback(
    (panel: EditorState['leftPanel']) =>
      dispatch({ type: 'SET_LEFT_PANEL', panel }),
    [dispatch]
  );

  const setRightPanel = useCallback(
    (open: boolean) => dispatch({ type: 'SET_RIGHT_PANEL', open }),
    [dispatch]
  );

  const setEditing = useCallback(
    (isEditing: boolean) => dispatch({ type: 'SET_EDITING', isEditing }),
    [dispatch]
  );

  return {
    setCanvasSize,
    setBackground,
    addText,
    updateText,
    removeText,
    selectText,
    setTool,
    undo,
    redo,
    showToast,
    setLeftPanel,
    setRightPanel,
    setEditing,
  };
}
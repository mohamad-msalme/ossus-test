import { ContentState, EditorProps, EditorState } from 'draft-js';
import React from 'react';

export const useEditorState = (
  value?: EditorState,
  defaultValue?: string | (() => Promise<string>),
  onChange?: React.Dispatch<React.SetStateAction<EditorState>>,
) => {
  // To fetchContent in mountPhase
  const mountedRef = React.useRef(true);

  // Kept previous state of isControlled to catch switch between controlled and uncontrolled modes
  const isControlled = !!value && !!onChange;
  const modeRef = React.useRef(isControlled);

  // keep defaultValue in ref to notChanged during re-render
  const defaultValueRef = React.useRef(defaultValue);

  const [isLoading, setIdLoading] = React.useState(false);

  const initState = () =>
    EditorState.createWithContent(
      ContentState.createFromText(
        typeof defaultValueRef.current === 'string'
          ? defaultValueRef.current
          : '',
      ),
    );

  const [editorState, setEditorState] = React.useState(initState);

  const handleChange: EditorProps['onChange'] = React.useCallback(
    (newEditorState: EditorState) => {
      if (isControlled) onChange(newEditorState);
      else setEditorState(newEditorState);
    },
    [isControlled, onChange],
  );

  const fetchContent = React.useCallback(async () => {
    if (typeof defaultValueRef.current === 'function') {
      try {
        setIdLoading(true);
        const content = await defaultValueRef.current();
        const newEditorState = EditorState.createWithContent(
          ContentState.createFromText(content),
        );
        handleChange(newEditorState);
      } finally {
        setIdLoading(false);
      }
    }
  }, [handleChange]);

  React.useLayoutEffect(() => {
    if (isControlled !== modeRef.current) {
      console.warn(
        isControlled
          ? 'Switched from uncontrolled to controlled mode. Ensure this is intentional.'
          : 'Switched from controlled to uncontrolled mode. Ensure this is intentional.',
      );
    }
    modeRef.current = isControlled;
  }, [isControlled]);

  React.useEffect(() => {
    if (typeof defaultValueRef.current === 'string' || !defaultValueRef.current)
      return;

    if (!mountedRef.current) return;

    mountedRef.current = false;
    fetchContent();
  }, [fetchContent]);

  return [isControlled ? value : editorState, handleChange, isLoading] as const;
};

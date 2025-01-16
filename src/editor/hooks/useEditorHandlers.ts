import {
  EditorProps,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
} from 'draft-js';
import React from 'react';

export const useEditorHandlers = (
  editorState: EditorState,
  setEditorState: (editorState: EditorState) => void,
) => {
  const handleKeyCommand = React.useCallback(
    (command: string) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    },
    [editorState, setEditorState],
  );

  const keyBindingFn = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.keyCode === 9) {
        const newEditorState = RichUtils.onTab(
          e,
          editorState,
          4 /* maxDepth */,
        );
        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return null;
      }
      return getDefaultKeyBinding(e);
    },
    [editorState, setEditorState],
  );

  const toggleBlockType = React.useCallback(
    (blockType: string) => {
      setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState, setEditorState],
  );

  const toggleInlineStyle = React.useCallback(
    (inlineStyle: string) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState, setEditorState],
  );

  const getBlockStyle: EditorProps['blockStyleFn'] = (block) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return '';
    }
  };

  return {
    handleKeyCommand,
    keyBindingFn,
    toggleBlockType,
    toggleInlineStyle,
    getBlockStyle,
  };
};

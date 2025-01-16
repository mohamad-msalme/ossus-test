import { Editor, EditorProps, EditorState } from 'draft-js';
import React from 'react';
import { BlockStyleControls } from './components/BlockStyleControls';
import { InlineStyleControls } from './components/InlineStyleControls';
import { STYLE_MAP } from './constants';
import { useEditorHandlers, useEditorState } from './hooks';
import './style/WYSIWYGEditor.css';

export type ToolbarRenderer = (
  editorState: EditorState,
  setEditorState: (editorState: EditorState) => void,
  onToggleInlineStyle: (style: string) => void,
  onToggleBlockType: (blockType: string) => void,
) => React.ReactNode;

export type WYSIWYGEditorProps = Partial<
  Omit<EditorProps, 'editorState' | 'onChange'>
> & {
  className?: string;
  value?: EditorState;
  toolbarClassName?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  defaultValue?: string | (() => Promise<string>);
  renderCustomToolbar?: ToolbarRenderer;
  onChange?: React.Dispatch<React.SetStateAction<EditorState>>;
};

export const WYSIWYGEditor: React.FC<
  React.PropsWithChildren<WYSIWYGEditorProps>
> = ({
  onChange,
  value,
  children,
  defaultValue = '',
  className = '',
  containerClassName = '',
  toolbarClassName = '',
  style,
  renderCustomToolbar,
  ...editorProps
}) => {
  const [editorState, setEditorState, isLoading] = useEditorState(
    value,
    defaultValue,
    onChange,
  );

  const {
    toggleBlockType,
    toggleInlineStyle,
    handleKeyCommand,
    keyBindingFn,
    getBlockStyle,
  } = useEditorHandlers(editorState, setEditorState);

  const editorClass = React.useMemo(() => {
    let baseClass = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      const firstBlockType = contentState.getBlockMap().first().getType();
      if (firstBlockType !== 'unstyled') {
        baseClass += ' RichEditor-hidePlaceholder';
      }
    }

    return baseClass;
  }, [editorState]);

  return (
    <div
      className={`RichEditor-root ${containerClassName}`}
      style={{
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      {renderCustomToolbar ? (
        renderCustomToolbar(
          editorState,
          setEditorState,
          toggleInlineStyle,
          toggleBlockType,
        )
      ) : (
        <div className={toolbarClassName}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
        </div>
      )}

      <div className={`${editorClass} ${className}`} style={style}>
        {isLoading && (
          <div className="RichEditor-loader-overlay">
            <div className="RichEditor-loader" />
          </div>
        )}
        <Editor
          spellCheck
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          onChange={setEditorState}
          blockStyleFn={getBlockStyle}
          customStyleMap={STYLE_MAP}
          keyBindingFn={keyBindingFn}
          {...editorProps}
        />
        {children}
      </div>
    </div>
  );
};

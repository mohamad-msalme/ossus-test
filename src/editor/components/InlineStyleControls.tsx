import { EditorState } from 'draft-js';
import { StyleButton } from './StyleButton';

type InlineType = {
  label: string;
  style: string;
};
export const INLINE_TYPES: InlineType[] = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

type InlineStyleControlsProps = {
  editorState: EditorState;
  onToggle: (style: string) => void;
  inlineTypes?: InlineType[];
  className?: string;
};

export const InlineStyleControls: React.FC<InlineStyleControlsProps> = ({
  editorState,
  onToggle,
  inlineTypes = INLINE_TYPES,
  className,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={`${className} RichEditor-controls`}>
      {inlineTypes.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          onToggle={onToggle}
          style={type.style}
        >
          {type.label}
        </StyleButton>
      ))}
    </div>
  );
};

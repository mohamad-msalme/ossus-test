import { EditorState } from 'draft-js';
import { StyleButton } from './StyleButton';

type BlockType = {
  label: string;
  style: string;
};

export const BLOCK_TYPES: BlockType[] = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

type BlockStyleControlsProps = {
  editorState: EditorState;
  onToggle: (style: string) => void;
  blockTypes?: BlockType[];
  className?: string;
};

export const BlockStyleControls: React.FC<BlockStyleControlsProps> = ({
  editorState,
  onToggle,
  blockTypes = BLOCK_TYPES,
  className,
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={`${className} RichEditor-controls`}>
      {blockTypes.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          onToggle={onToggle}
          style={type.style}
        >
          {type.label}
        </StyleButton>
      ))}
    </div>
  );
};

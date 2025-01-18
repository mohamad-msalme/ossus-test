import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorState } from 'draft-js';
import { describe, expect, test, vi } from 'vitest';
import { WYSIWYGEditor } from '..';
import { BLOCK_TYPES, INLINE_TYPES } from '../components';

describe('WYSIWYGEditor Toolbar', () => {
  test('renders toolbar with inline and block style controls', () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();

    render(<WYSIWYGEditor value={editorState} onChange={mockOnChange} />);

    // Verify inline style buttons are rendered
    INLINE_TYPES.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    // Verify block style buttons are rendered
    BLOCK_TYPES.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('triggers inline style toggle on button click', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();

    render(<WYSIWYGEditor value={editorState} onChange={mockOnChange} />);

    const boldButton = screen.getByText('Bold');

    await user.click(boldButton);

    // Verify that the bold style was toggled
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('triggers block style toggle on button click', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();

    render(<WYSIWYGEditor value={editorState} onChange={mockOnChange} />);

    const h1Button = screen.getByText('H1');

    await user.click(h1Button);

    // Verify that the block style was toggled
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('renders a custom toolbar when provided', async () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();

    const customToolbar = vi
      .fn()
      .mockImplementation(() => <div>Custom Toolbar</div>);

    render(
      <WYSIWYGEditor
        value={editorState}
        onChange={mockOnChange}
        renderCustomToolbar={customToolbar}
      />,
    );

    expect(screen.getByText('Custom Toolbar')).toBeInTheDocument();
    expect(customToolbar).toHaveBeenCalledWith(
      editorState,
      expect.any(Function), // setEditorState
      expect.any(Function), // onToggleInlineStyle
      expect.any(Function), // onToggleBlockType
    );
  });
});

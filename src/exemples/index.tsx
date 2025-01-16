import { EditorState } from 'draft-js';
import React from 'react';
import { ToolbarRenderer, WYSIWYGEditor } from '../editor';
import {
  BLOCK_TYPES,
  BlockStyleControls,
  INLINE_TYPES,
  InlineStyleControls,
} from '../editor/components';

// Divider component with improved styling
const Divider = () => (
  <div
    style={{
      margin: '30px 0',
      height: '1px',
      width: '100%',
      backgroundColor: '#E0E0E0',
      opacity: 0.6,
    }}
  ></div>
);

// Controlled Editor with state management and placeholder description
const ControlledEditor: React.FC = () => {
  const [value, setValue] = React.useState(EditorState.createEmpty());

  return (
    <div
      style={{
        margin: '30px 0',
        maxWidth: '800px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333' }}>Controlled Editor</h2>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
        This editor uses controlled state management, allowing the parent
        component to directly control the editor's content.
      </p>
      <WYSIWYGEditor
        value={value}
        onChange={setValue}
        placeholder="Start typing here..."
      />
    </div>
  );
};

// Async Controlled Editor with async default value and remount functionality
const AsyncControlledEditor: React.FC = () => {
  const [counter, setCounter] = React.useState(0);
  const [value, setValue] = React.useState(EditorState.createEmpty());
  const asyncDefaultValue = () =>
    new Promise<string>((res) =>
      setTimeout(() => res('Loaded content from the backend'), 2000),
    );

  return (
    <div
      style={{
        margin: '30px 0',
        maxWidth: '800px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333' }}>
        Async Controlled Editor
      </h2>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
        This editor supports async loading of content, simulating content
        fetched from a backend.
      </p>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
          setValue(EditorState.createEmpty());
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        Remount Editor
      </button>
      <WYSIWYGEditor
        key={counter}
        value={value}
        defaultValue={asyncDefaultValue}
        onChange={setValue}
        placeholder="Loading content..."
      />
    </div>
  );
};

// Controlled Editor with Save Action and async mutation
const ControlledEditorWithMutation: React.FC = () => {
  const [value, setValue] = React.useState(EditorState.createEmpty());
  const [isPending, setIsPending] = React.useState(false);

  const handleSave = async () => {
    try {
      setIsPending(true);
      const content = value.getCurrentContent().getPlainText();
      await new Promise((res) => setTimeout(() => res(alert(content)), 1000));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      style={{
        margin: '30px 0',
        maxWidth: '800px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333' }}>
        Controlled Editor with Save Action
      </h2>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
        This editor supports saving content asynchronously. Click the "Save
        Content" button to simulate saving the current content.
      </p>
      <WYSIWYGEditor
        value={value}
        onChange={setValue}
        placeholder="Edit and save your content..."
      />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button
          disabled={isPending}
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          {isPending ? 'Saving...' : 'Save Content'}
        </button>
      </div>
    </div>
  );
};

// Custom Toolbar Editor with block and inline style controls
const CustomToolbarEditor: React.FC = () => {
  const CustomToolbar: ToolbarRenderer = (
    editorState,
    setEditorState,
    onToggleInlineStyle,
    onToggleBlockType,
  ) => {
    return (
      <>
        <BlockStyleControls
          onToggle={onToggleBlockType}
          editorState={editorState}
          blockTypes={BLOCK_TYPES.slice(0, 3)}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={onToggleInlineStyle}
          inlineTypes={INLINE_TYPES.slice(2)}
        />
      </>
    );
  };

  return (
    <div
      style={{
        margin: '30px 0',
        maxWidth: '800px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333' }}>
        Editor with Custom Toolbar
      </h2>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
        This editor uses a custom toolbar for controlling block and inline
        styles. It's ideal for editors that need specialized formatting
        controls.
      </p>
      <WYSIWYGEditor
        renderCustomToolbar={CustomToolbar}
        placeholder="Start typing with custom toolbar..."
      />
    </div>
  );
};

// Uncontrolled Editor with default value
const UncontrolledEditor: React.FC = () => {
  return (
    <div
      style={{
        margin: '30px 0',
        maxWidth: '800px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333' }}>Uncontrolled Editor</h2>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
        This editor is uncontrolled, meaning it manages its internal state, and
        external components can't directly control it.
      </p>
      <WYSIWYGEditor placeholder="Uncontrolled Editor" />
    </div>
  );
};

// Uncontrolled Editor with default content value
const UncontrolledEditorWithDefaultValue: React.FC = () => {
  const defaultValue = 'This is content from the default value';

  return (
    <div
      style={{
        margin: '30px 0',
        maxWidth: '800px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', color: '#333' }}>
        Uncontrolled Editor with Default Value
      </h2>
      <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
        This editor starts with a default content value, which can be edited but
        is not controlled externally.
      </p>
      <WYSIWYGEditor
        defaultValue={defaultValue}
        placeholder="Edit content..."
      />
    </div>
  );
};

// Demo Page with all examples
export const DemoPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', color: '#333' }}>
        WYSIWYG Editor Demo
      </h1>
      <ControlledEditor />
      <Divider />
      <AsyncControlledEditor />
      <Divider />
      <ControlledEditorWithMutation />
      <Divider />
      <CustomToolbarEditor />
      <Divider />
      <UncontrolledEditor />
      <Divider />
      <UncontrolledEditorWithDefaultValue />
    </div>
  );
};

# WYSIWYG Editor Component

This is a customizable WYSIWYG (What You See Is What You Get) editor built with React and Draft.js. It offers both controlled and uncontrolled modes, toolbar customization, and many built-in styling and block features. You can use it as a rich text editor for a wide range of applications such as content management systems, blogging platforms, or any app requiring rich text editing.

## Features

- **Controlled and Uncontrolled Modes**:

  - **Controlled Mode**: You can pass a value (`EditorState`) and an `onChange` function to manage the editor state externally.
    - In case you need to initialize the editor content asynchronously, you can pass `defaultValue` as a `Promise<string>`. The editor will handle the promise internally and update the content once the promise resolves.
  - **Uncontrolled Mode**: The editor manages its own state internally you can init the editor content by pass `defaultValue` as `string`.

- **Customizable Toolbar**: You can provide a custom toolbar using the `renderCustomToolbar` prop. If not provided, a default toolbar is rendered with inline and block style controls.

- **Block and Inline Style Controls**:

  - Inline style controls include options like bold, italic, underline, etc.
  - Block style controls allow you to toggle between different block types such as headings, quotes, lists, etc.
  - Both components are customizable, and you can determine the styles you would like to render in the toolbar and editor.

- **Command Handling**: The editor supports the use of key commands for rich text functionality. You can handle key commands like `Ctrl-B` for bold, `Ctrl-I` for italic, and more. The editor will process these commands and apply the respective styles.

- **Customizable Styles**: You can customize the editor's appearance using class names and inline styles through the `className`, `style`, `toolbarClassName`, `containerClassName` props.

- **Loading State**: The editor displays a loader when content is being fetched asynchronously, giving users feedback that content is being loaded in case `AsyncControlledEditor`.

- **Change Mode During Render**: The editor `console.warn` in case we switch between `controlled and uncontrolled mode`

## Exemples

### **Controlled Editor**
- in controlled mode in case you pass defaultValue as `string` the editor will ignore this value
- in case you pass defaultValue as `promise<string>` editor will fill editor content ocnce the promise resolved

```tsx
const ControlledEditor: React.FC = () => {
  // External state management (controlled mode)
  const [value, setValue] = React.useState(EditorState.createEmpty());

  return (
    <WYSIWYGEditor
      value={value} // Controlled state passed to the component
      onChange={setValue} // Handle state changes outside the editor
      placeholder="Write something..."
    />
  );
};
```

### **Async Controlled Editor**
- we dont catch the error for async defaultValue so please keep in your mind to use `try/catch` for your `promise`
```tsx
const AsyncControlledEditor: React.FC = () => {
  // External state with async default value
  const [value, setValue] = React.useState(EditorState.createEmpty());
  const asyncDefaultValue = () =>
    new Promise<string>((res) =>
      setTimeout(() => res('Loaded content from the backend'), 5000),
    );

  return (
    <WYSIWYGEditor
      key={counter}
      value={value}
      defaultValue={asyncDefaultValue}
      onChange={setValue}
      placeholder="Loading content..."
    />
  );
};
```

### **Controlled Editor with Mutation**

- The Editor can tacke children and render it as footer for the editor
- This approach give the developer the full control on stylying footer and render anything they want 
```tsx
const ControlledEditorWithMutation: React.FC = () => {
  const [value, setValue] = React.useState(EditorState.createEmpty());
  const [isPending, setIsPending] = React.useState(false);

  const handleSave = async (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      setIsPending(true);
      const content = value.getCurrentContent().getPlainText();
      await new Promise((res) => setTimeout(() => res(alert(content)), 1000));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Controlled Editor with Save Action</h2>
      <WYSIWYGEditor
        value={value}
        onChange={setValue}
        placeholder="Edit and save..."
      >
        <div
          style={{
            marginTop: '1rem',
            textAlign: 'right',
          }}
        >
          <button
            disabled={isPending}
            onClick={handleSave}
            style={{
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Save Content
          </button>
        </div>
      </WYSIWYGEditor>
    </div>
  );
};
```

### **CustomTollbarEditor**

**you can return any `jsx` from this function**

```tsx
const CustomToolbarEditor: React.FC = () => {
  // Custom toolbar with external control over block and inline styles
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
          blockTypes={BLOCK_TYPES.slice(0, 3)} // Restricting block styles
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={onToggleInlineStyle}
          inlineTypes={INLINE_TYPES.slice(2)} // Restricting inline styles
        />
      </>
    );
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Editor with Custom Toolbar</h2>
      <WYSIWYGEditor
        renderCustomToolbar={CustomToolbar}
        placeholder="With custom toolbar"
      />
    </div>
  );
};
```

### **Uncontrolled Editor**
- you can pass defaultValue as string in `Uncontrolled Editor`
```tsx
const UncontrolledEditor: React.FC = () => {
  // Uncontrolled editor with internal state
  return <WYSIWYGEditor placeholder="Uncontrolled Editor" />;
};

const UncontrolledEditorWithDefaultValue: React.FC = () => {
  // Uncontrolled editor with a default value
  const defaultValue = 'This is content from default value';
  return (
    <WYSIWYGEditor
      defaultValue={defaultValue} // Default value for the uncontrolled editor
      placeholder="Default Value"
    />
  );
};
```



## Installation

```bash
npm install
npm run dev
````

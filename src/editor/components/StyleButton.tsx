type StyleButtonProps = {
  active: boolean;
  onToggle: (style: string) => void;
  style: string;
};

export const StyleButton: React.FC<
  React.PropsWithChildren<StyleButtonProps>
> = ({ active = false, onToggle, style, children }) => {
  const className = active ? 'RichEditor-activeButton' : '';

  const handelMouseDown = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    e.preventDefault();
    onToggle(style);
  };

  return (
    <span
      className={`RichEditor-styleButton ${className}`}
      onMouseDown={handelMouseDown}
    >
      {children}
    </span>
  );
};

interface Props {
  type: 'button' | 'submit' | 'reset';
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: string;
}

export default function Button({ type, label, onClick, children, style }: Props) {
  
  return (
    <button
      id={label}
      className={style ?? "rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"}
      onClick={onClick ? () => onClick() : undefined}
      type={type}
    >
      {label}
      {children}
    </button>
  );
}

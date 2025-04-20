interface Props {
  type: 'button' | 'submit' | 'reset';
  label?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({ label, onClick, children }: Props) {
  return (
    <button
      className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
      onClick={onClick ? () => onClick() : undefined}
    >
      {label}
      {children}
    </button>
  );
}

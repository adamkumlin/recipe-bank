interface Props {
  type: 'button' | 'link';
  label: string;
  onClick?: () => void;
}

export default function Button({ type, label, onClick }: Props) {
  if (type === 'button') {
    return (
      <button
        className="rounded-md text-white bg-slate-700 m-2 p-2 mb-4 hover:scale-110"
        onClick={onClick ? () => onClick() : undefined}>
        {label}
      </button>
    );
  }
}

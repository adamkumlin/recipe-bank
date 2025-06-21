interface Props {
  type: React.HTMLInputTypeAttribute;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: { label: string; input: string };
  id: string;
}

export default function TextField({
  type,
  value,
  label,
  onChange,
  style,
  id
}: Props) {
  return (
    <div className="flex flex-col">
      <label
        className={style?.label ?? 'uppercase text-2xl'}
        htmlFor={id}
        id={`${id}-label`}
      >
        {label}
      </label>
      <input
        id={id}
        autoComplete="off"
        onChange={e => onChange(e)}
        value={value}
        type={type}
        className={
          style?.input ??
          'w-full h-10 max-w-sm text-black border-[1px] rounded-lg border-gray-700 text-2xl font-sans'
        }
        name={id}
      />
    </div>
  );
}

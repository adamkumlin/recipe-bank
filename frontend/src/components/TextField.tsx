import { animate } from 'animejs';
import { useEffect } from 'react';

interface Props {
  type: React.HTMLInputTypeAttribute;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animateLabels: boolean;
}

export default function TextField({
  type,
  value,
  label,
  onChange,
  animateLabels,
}: Props) {
  useEffect(() => {
    const animation = animate(`#${label}-label`, {
      y: {
        from: 50,
        to: 0,
        duration: 1000,
      },
      scale: {
        from: 0.75,
        to: 1,
        duration: 2000,
      },
    });
    if (!animateLabels) {
      animation.revert();
    }
  }, []);
  return (
    <>
      <label
        className="uppercase text-2xl"
        htmlFor={label}
        id={`${label}-label`}>
        {label}
      </label>
      <input
        id={label}
        autoComplete="off"
        onChange={e => onChange(e)}
        value={value}
        type={type}
        className="w-1/2 h-10 max-w-sm text-black border-[1px] rounded-lg border-gray-700 px-2 text-2xl font-sans"
        name={label}
      />
    </>
  );
}

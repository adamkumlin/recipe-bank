import { useEffect, useState } from 'react';
import Button from './Button';
import { Eye, EyeClosed } from 'lucide-react';
import { animate } from 'animejs';

interface Props {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animateLabels?: boolean;
}

export default function PasswordField({
  value,
  label,
  onChange,
  animateLabels,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="relative">
      <label
        className={'uppercase text-2xl block w-full'}
        htmlFor={label}
        id={`${label}-label`}
      >
        {label}
      </label>
      <input
        id={label}
        autoComplete="off"
        onChange={e => onChange(e)}
        value={value}
        type={showPassword ? 'text' : 'password'}
        className={
          'w-full h-10 max-w-sm text-black border-[1px] rounded-lg border-gray-700 text-2xl font-sans'
        }
        name={label}
      />
      <Button
        style="rounded-md text-black absolute w-fit h-fit right-[5px]"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {!showPassword ? (
          <Eye className="w-[30px] h-10" />
        ) : (
          <EyeClosed className="w-[25px] h-10" />
        )}
      </Button>
    </div>
  );
}

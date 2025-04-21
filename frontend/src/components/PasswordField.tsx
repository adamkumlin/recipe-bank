import { useRef, useState } from 'react';
import TextField from './TextField';
import Button from './Button';
import { Eye, EyeClosed } from 'lucide-react';

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
        type={showPassword ? "text" : "password"}
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
          <Eye className='w-[30px] h-10'/>
        ) : (
          <EyeClosed className='w-[25px] h-10'/>
        )}
      </Button>
        </div>
  );
}

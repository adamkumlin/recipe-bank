import { useState } from 'react';
import Button from './Button';
import { Eye, EyeClosed } from 'lucide-react';

interface Props {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export default function PasswordField({
  value,
  label,
  onChange,
  id
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <label
        className={'uppercase text-2xl block w-full'}
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
        type={showPassword ? 'text' : 'password'}
        className={
          'w-full h-10 max-w-sm text-black border-[1px] rounded-lg border-gray-700 text-2xl font-sans'
        }
        name={id}
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

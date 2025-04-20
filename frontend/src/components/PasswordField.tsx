import { useState } from 'react';
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
    <div className="w-full">
      <TextField
        type={!showPassword ? 'password' : 'text'}
        value={value}
        label={label}
        onChange={onChange}
        animateLabels={animateLabels}
        style={{
          label: 'uppercase text-2xl block',
          input:
            'w-1/2 h-10 max-w-sm text-black border-[1px] rounded-lg border-gray-700 px-2 text-2xl font-sans ml-[40px]',
        }}
      />
      <Button
        style="rounded-md text-black relative right-[35px] h-10 w-[40px]"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {!showPassword ? <Eye /> : <EyeClosed />}
      </Button>
    </div>
  );
}

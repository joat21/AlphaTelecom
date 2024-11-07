import { FC, InputHTMLAttributes } from 'react';
import { useMask } from '@react-input/mask';
import { Input } from '../../UI';

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const PhoneInput: FC<PhoneInputProps> = ({ onChange, ...props }) => {
  const inputRef = useMask({
    mask: '+7 (___) ___-__-__',
    replacement: { _: /\d/ },
  });

  return (
    <Input
      ref={inputRef}
      type="tel"
      placeholder="+7 (___) ___-__-__"
      onChange={onChange}
      {...props}
    />
  );
};

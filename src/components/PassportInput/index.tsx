import { FC, InputHTMLAttributes } from 'react';
import { useMask } from '@react-input/mask';
import { Input } from '@UI';

interface PassportInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'primary' | 'secondary';
}

export const PassportInput: FC<PassportInputProps> = ({
  onChange,
  ...props
}) => {
  const inputRef = useMask({
    mask: '____ ______',
    replacement: { _: /\d/ },
  });

  return (
    <Input
      ref={inputRef}
      type="tel"
      placeholder="XXXX XXXXXX"
      onChange={onChange}
      {...props}
    />
  );
};

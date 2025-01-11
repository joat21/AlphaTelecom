import { useMask } from '@react-input/mask';
import { Input } from '@UI';
import { FC, InputHTMLAttributes } from 'react';

interface CardNumberInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CardNumberInput: FC<CardNumberInputProps> = ({ ...props }) => {
  const inputRef = useMask({
    mask: '0000 0000 0000 0000',
    replacement: { 0: /\d/ },
  });

  return (
    <Input
      ref={inputRef}
      placeholder="0000 0000 0000 0000"
      variant="secondary"
      {...props}
    />
  );
};

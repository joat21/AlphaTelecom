import { useMask } from '@react-input/mask';
import { Input } from '@UI';
import { FC, InputHTMLAttributes } from 'react';

interface OwnerNameInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const OwnerNameInput: FC<OwnerNameInputProps> = ({ ...props }) => {
  const inputRef = useMask({
    mask: 'ААААААААААААААААААААА',
    replacement: {
      А: /[\u0400-\u04FF\s]/,
    },
  });

  return (
    <Input
      ref={inputRef}
      placeholder="Имя владельца"
      variant="secondary"
      style={{ textTransform: 'uppercase' }}
      {...props}
    />
  );
};

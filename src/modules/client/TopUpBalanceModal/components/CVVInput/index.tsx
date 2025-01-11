import { useMask } from '@react-input/mask';
import { Input } from '@UI';
import { FC, InputHTMLAttributes } from 'react';

interface CVVInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const CVVInput: FC<CVVInputProps> = ({ ...props }) => {
  const inputRef = useMask({
    mask: '000',
    replacement: { 0: /\d/ },
  });

  return (
    <Input ref={inputRef} placeholder="CVV" variant="secondary" {...props} />
  );
};

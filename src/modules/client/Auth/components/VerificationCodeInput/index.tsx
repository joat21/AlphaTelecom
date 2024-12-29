import { FC, InputHTMLAttributes } from 'react';
import { useMask } from '@react-input/mask';
import { Input } from '@UI';

interface VerificationCodeInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const VerificationCodeInput: FC<VerificationCodeInputProps> = ({
  onChange,
  ...props
}) => {
  const inputRef = useMask({
    mask: '______',
    replacement: { _: /\d/ },
  });

  return (
    <Input ref={inputRef} placeholder="Код" onChange={onChange} {...props} />
  );
};

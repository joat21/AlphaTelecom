import { useMask } from '@react-input/mask';
import { Input } from '@UI';
import { FC, InputHTMLAttributes } from 'react';

interface ValidityPeriodInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const ValidityPeriodInput: FC<ValidityPeriodInputProps> = ({
  ...props
}) => {
  const inputRef = useMask({
    mask: '__/__',
    replacement: { _: /\d/ },
  });

  return (
    <Input ref={inputRef} placeholder="ММ/ГГ" variant="secondary" {...props} />
  );
};

import { FC } from 'react';
import { Radio as AntDRadio, RadioGroupProps } from 'antd';

export const Radio: FC<RadioGroupProps> = ({ children, ...props }) => {
  return <AntDRadio {...props}>{children}</AntDRadio>;
};

export const RadioGroup: FC<RadioGroupProps> = (props) => {
  return <AntDRadio.Group {...props} />;
};

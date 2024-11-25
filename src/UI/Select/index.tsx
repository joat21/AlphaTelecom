import { FC } from 'react';
import { Select as AntDSelect, SelectProps as AntDSelectProps } from 'antd';
import styles from './Select.module.scss';

interface SelectProps extends Omit<AntDSelectProps<any>, 'options'> {
  options: number[] | string[];
  label?: string;
  name?: string;
}

export const Select: FC<SelectProps> = ({ options, label, ...props }) => {
  const formattedOptions = options.map((option) => ({
    value: Number(option),
    label: option.toString(),
  }));

  return (
    <label className={styles.label}>
      {label}
      <AntDSelect
        style={{ width: 120 }}
        options={formattedOptions}
        {...props}
      />
    </label>
  );
};

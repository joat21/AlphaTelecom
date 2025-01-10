import { FC } from 'react';
import classNames from 'classnames';
import styles from './ButtonRadio.module.scss';
import btnStyles from 'UI/Button/Button.module.scss';

export interface ButtonRadioProps {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const ButtonRadio: FC<ButtonRadioProps> = ({
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      {options.map((option) => (
        <label
          key={option.value}
          className={classNames(btnStyles.btn, styles.btn, {
            [btnStyles['btn-primary']]: option.value === value,
            [btnStyles['btn-secondary']]: option.value !== value,
          })}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className="hidden-dn"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

import React from 'react';
import classNames from 'classnames';
import styles from './ButtonCheckbox.module.scss';
import btnStyles from 'UI/Button/Button.module.scss';

interface ButtonCheckboxProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const ButtonCheckbox: React.FC<ButtonCheckboxProps> = ({
  name,
  label,
  checked,
  onChange,
}) => {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={() => {}}
        className="hidden-dn"
      />
      <button
        type="button"
        className={classNames(btnStyles.btn, {
          [btnStyles['btn-primary']]: checked,
          [btnStyles['btn-secondary']]: !checked,
        })}
        onClick={handleClick}
      >
        {label}
      </button>
    </div>
  );
};

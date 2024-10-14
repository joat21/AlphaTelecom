import { ChangeEvent, FC } from 'react';
import styles from './ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  id: string;
  name: string;
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ id, name, label, isChecked, onChange }) => {
  const onToggle = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <input
      className={styles.toggle}
      type="checkbox"
      id={id}
      name={name}
      role="switch"
      checked={isChecked}
      onChange={onToggle}
      aria-label={label}
    />
  );
};

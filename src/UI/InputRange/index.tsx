import { ChangeEvent, FC, useState } from 'react';
import styles from './InputRange.module.scss';
import classNames from 'classnames';

interface InputRangeProps {
  id: string;
  name: string;
  label: string;
  datalist: number[];
  onChange: (value: number) => void;
}

export const InputRange: FC<InputRangeProps> = ({ id, name, label, datalist, onChange }) => {
  const [value, setValue] = useState(0);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(datalist[newValue]);
  };

  const min = 0;
  const max = datalist.length - 1;
  const percentage = (100 * (value - min)) / (max - min);

  const rangerStyle = {
    background: `linear-gradient(90deg, var(--red) 0, var(--red) ${percentage}%, var(--gray) ${
      percentage + 0.1
    }%)`,
  };

  return (
    <label className={styles.label}>
      {label}
      <input
        className={styles.range}
        style={rangerStyle}
        type="range"
        value={value}
        onChange={onChangeInput}
        min={0}
        max={datalist.length - 1}
        step={1}
        id={id}
        name={name}
        list={`${id}-datalist`}
      />
      <datalist className={styles.datalist} id={`${id}-datalist`}>
        {datalist.map((item, i) => (
          <option
            className={classNames(styles.option, { [styles.active]: value === i })}
            key={i}
            value={i}
            label={item.toString()}
          />
        ))}
      </datalist>
    </label>
  );
};

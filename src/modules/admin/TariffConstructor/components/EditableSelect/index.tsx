import { FC, useState } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import { FieldInputProps } from 'formik';

import { ControlChanger } from '../ControlChanger';
import { Input, Select } from '@UI';

import styles from './EditableSelect.module.scss';

interface EditableSelectProps {
  name: string;
  label: string;
  options: number[] | string[];
  onSelectChange: (
    value: any,
    option: DefaultOptionType | DefaultOptionType[]
  ) => void;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  field: FieldInputProps<any>;
}

export const EditableSelect: FC<EditableSelectProps> = ({
  name,
  label,
  options,
  onSelectChange,
  onInputChange,
  field,
}) => {
  const [isSelect, setIsSelect] = useState(true);

  return (
    <div className={styles.wrapper}>
      {isSelect ? (
        <Select
          {...field}
          id={name}
          name={name}
          options={options}
          onChange={onSelectChange}
          variant="filled"
          style={{
            width: '100%',
            height: 50,
          }}
        />
      ) : (
        <Input
          {...field}
          id={name}
          type="number"
          variant="secondary"
          name={name}
          placeholder={label}
          onChange={onInputChange}
          min={0}
        />
      )}
      <ControlChanger isSelect={isSelect} setIsSelect={setIsSelect} />
    </div>
  );
};

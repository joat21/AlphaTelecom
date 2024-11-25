import { FC } from 'react';
import { RadioProps } from 'antd';

import { Field } from 'formik';
import { Radio } from '@UI';

import { TariffConstructorFormValues } from '../TariffConstructor';

import styles from './StatusRadio.module.scss';

const options = [
  { label: 'Активен', value: 'Активен' },
  { label: 'В архиве', value: 'В архиве' },
];

interface StatusRadioProps extends RadioProps {
  initialValues: TariffConstructorFormValues;
}

export const StatusRadio: FC<StatusRadioProps> = ({
  onChange,
  initialValues,
  ...props
}) => {
  return (
    <div className={styles.status}>
      <span>Статус</span>
      <Field name="isActive">
        {() => (
          <Radio.Group
            name="isActive"
            options={options}
            defaultValue={
              initialValues.isActive ? options[0].value : options[1].value
            }
            onChange={onChange}
            {...props}
          />
        )}
      </Field>
    </div>
  );
};

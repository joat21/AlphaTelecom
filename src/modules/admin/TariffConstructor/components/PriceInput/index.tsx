import { FC, InputHTMLAttributes } from 'react';
import { Field } from 'formik';
import { Input } from '@UI';

interface PriceInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const PriceInput: FC<PriceInputProps> = (props) => {
  return (
    <label>
      Цена тарифа, ₽
      <Field name="price">
        {() => (
          <Input type="number" name="price" placeholder="Цена" {...props} />
        )}
      </Field>
    </label>
  );
};

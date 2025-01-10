import { FC, InputHTMLAttributes } from 'react';
import { ErrorMessage, Field } from 'formik';
import { Input, ValidatedFieldWrapper } from '@UI';

interface PriceInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const PriceInput: FC<PriceInputProps> = (props) => {
  return (
    <ValidatedFieldWrapper>
      <label>
        Цена тарифа, ₽
        <Field name="price">
          {() => (
            <Input
              type="number"
              name="price"
              placeholder="Цена"
              variant="secondary"
              {...props}
            />
          )}
        </Field>
      </label>
      <ErrorMessage name="price" component="p" />
    </ValidatedFieldWrapper>
  );
};

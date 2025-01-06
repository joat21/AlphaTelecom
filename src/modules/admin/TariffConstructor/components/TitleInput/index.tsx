import { FC, InputHTMLAttributes } from 'react';
import { ErrorMessage, Field } from 'formik';
import { Input, ValidatedFieldWrapper } from '@UI';

interface TitleInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TitleInput: FC<TitleInputProps> = (props) => {
  return (
    <ValidatedFieldWrapper>
      <label>
        Название тарифа
        <Field name="title">
          {() => (
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Название"
              variant="secondary"
              {...props}
            />
          )}
        </Field>
      </label>
      <ErrorMessage name="title" component="p" />
    </ValidatedFieldWrapper>
  );
};

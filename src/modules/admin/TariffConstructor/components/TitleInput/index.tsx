import { FC, InputHTMLAttributes } from 'react';
import { ErrorMessage, Field } from 'formik';
import { Input } from '@UI';
import styles from './TitileInput.module.scss';

interface TitleInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TitleInput: FC<TitleInputProps> = (props) => {
  return (
    <div>
      <label className={styles['title-label']} htmlFor="title">
        <span>Название тарифа</span>
        <ErrorMessage name="title" />
      </label>
      <Field name="title">
        {() => (
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Название"
            {...props}
          />
        )}
      </Field>
    </div>
  );
};

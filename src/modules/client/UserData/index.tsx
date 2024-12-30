import { FC } from 'react';

import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { PassportInput } from '@components/PassportInput';
import { Button, Input, ValidatedFieldWrapper } from '@UI';

import { useRegisterMutation } from '@services/authApi';

import styles from './UserData.module.scss';

const registerSchema = object({
  surname: string().required('Поле не может быть пустым'),
  name: string().required('Поле не может быть пустым'),
  patronymic: string().required('Поле не может быть пустым'),
  passportData: string()
    .matches(/^\d{4} \d{6}$/, 'Введите корректные данные')
    .required('Поле не может быть пустым'),
});

interface UserDataFormValues extends InferType<typeof registerSchema> {}

export const UserData: FC = () => {
  const [register] = useRegisterMutation();

  return (
    <AuthFormWrapper<UserDataFormValues>
      title="Введите свои данные"
      initialValues={{
        surname: '',
        name: '',
        patronymic: '',
        passportData: '',
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await register(values).unwrap();
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <ValidatedFieldWrapper>
            <label htmlFor="surname" className="hidden">
              Фамилия
            </label>
            <Field
              id="surname"
              type="text"
              name="surname"
              placeholder="Фамилия"
              as={Input}
            />
            <ErrorMessage
              className={styles.error}
              name="surname"
              component="p"
            />
          </ValidatedFieldWrapper>

          <ValidatedFieldWrapper>
            <label htmlFor="name" className="hidden">
              Имя
            </label>
            <Field
              id="name"
              type="text"
              name="name"
              placeholder="Имя"
              as={Input}
            />
            <ErrorMessage className={styles.error} name="name" component="p" />
          </ValidatedFieldWrapper>

          <ValidatedFieldWrapper>
            <label htmlFor="patronymic" className="hidden">
              Отчество
            </label>
            <Field
              id="patronymic"
              type="text"
              name="patronymic"
              placeholder="Отчество"
              as={Input}
            />
            <ErrorMessage
              className={styles.error}
              name="patronymic"
              component="p"
            />
          </ValidatedFieldWrapper>

          <ValidatedFieldWrapper>
            <label htmlFor="passportData" className="hidden">
              Серия и номер паспорта
            </label>
            <Field
              id="passportData"
              type="tel"
              name="passportData"
              placeholder="Серия и номер паспорта"
              as={PassportInput}
            />
            <ErrorMessage
              className={styles.error}
              name="passportData"
              component="p"
            />
          </ValidatedFieldWrapper>

          <Button type="submit" className={styles.btn} disabled={isSubmitting}>
            Далее
          </Button>
        </Form>
      )}
    </AuthFormWrapper>
  );
};

import { FC } from 'react';

import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { Button, Input } from '@UI';

import { useRegisterMutation } from '@services/authApi';

import { PassportInput } from '../../../components/PassportInput';

import styles from './UserData.module.scss';

const registerSchema = object({
  surname: string().required('Поле не может быть пустым'),
  name: string().required('Поле не может быть пустым'),
  patronymic: string().required('Поле не может быть пустым'),
  //passportData: string().required('Поле не может быть пустым').length(11),
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
      initialValues={{ surname: '', name: '', patronymic: '', passportData: '' }}
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
          <div>
            <ErrorMessage name="surname" component="p" />
            <Field type="text" name="surname" placeholder="Фамилия" as={Input} />
          </div>

          <div>
            <ErrorMessage name="name" component="p" />
            <Field type="text" name="name" placeholder="Имя" as={Input} />
          </div>

          <div>
            <ErrorMessage name="patronymic" component="p" />
            <Field type="text" name="patronymic" placeholder="Отчество" as={Input} />
          </div>

          <div>
            <ErrorMessage name="passportData" component="p" />
            <Field
              type="tel"
              name="passportData"
              placeholder="Серия и номер паспорта"
              as={PassportInput}
            />
          </div>

          <Button type="submit" className={styles.btn} disabled={isSubmitting}>
            Далее
          </Button>
        </Form>
      )}
    </AuthFormWrapper>
  );
};

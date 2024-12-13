import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { Button, Input } from '@UI';

import { useLoginMutation } from '@services/authApi';
import { ROUTES } from '@constants/routes';

import styles from './Auth.module.scss';

const loginSchema = object({
  login: string().required('Поле не может быть пустым'),
  password: string().required('Поле не может быть пустым'),
});

interface LoginFormValues extends InferType<typeof loginSchema> {}

const Auth: FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  return (
    <AuthFormWrapper<LoginFormValues>
      title="Введите логин и пароль"
      initialValues={{ login: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          await login(values).unwrap();
          navigate('/' + ROUTES.ADMIN.HOME);
        } catch (error) {
          setErrors({ login: 'Неправильный логин или пароль' });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <ErrorMessage name="login" component="p" />
            <Field type="text" name="login" placeholder="Логин" as={Input} />
          </div>

          <div>
            <ErrorMessage name="password" component="p" />
            <Field type="password" name="password" placeholder="Пароль" as={Input} />
          </div>

          <Button type="submit" className={styles.btn} disabled={isSubmitting}>
            Далее
          </Button>
        </Form>
      )}
    </AuthFormWrapper>
  );
};

export default Auth;

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { Button, Input } from '@UI';

import { useLoginMutation } from '@services/authApi';
import { ROUTES } from '@constants/routes';

import styles from './Auth.module.scss';
import { useDispatch } from 'react-redux';
import { setGuestId } from '@store/Auth/slice';

const loginSchema = object({
  login: string().required('Обязательно'),
  password: string().required('Обязательно'),
});

interface LoginFormValues extends InferType<typeof loginSchema> {}

const Auth: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  return (
    <AuthFormWrapper<LoginFormValues>
      title="Авторизация"
      initialValues={{ login: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          await login(values).unwrap();
          dispatch(setGuestId(null));
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
            <h3 className={styles['input-name']}>
              Логин <ErrorMessage name="login" component="p" />
            </h3>
            <Field
              type="text"
              name="login"
              placeholder="Введите логин"
              as={Input}
            />
          </div>

          <div>
            <h3 className={styles['input-name']}>
              Пароль <ErrorMessage name="password" component="p" />
            </h3>
            <Field
              type="password"
              name="password"
              placeholder="Введите пароль"
              as={Input}
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

export default Auth;

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { Button, Input, ValidatedFieldWrapper } from '@UI';

import { useLoginMutation } from '@services/authApi';
import { ROUTES } from '@constants/routes';

import styles from './Auth.module.scss';
import { useDispatch } from 'react-redux';
import { setGuestId } from '@store/Auth/slice';

const loginSchema = object({
  login: string().required('Поле не может быть пустым'),
  password: string().required('Поле не может быть пустым'),
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
          <ValidatedFieldWrapper>
            <ErrorMessage name="login" component="p" />
            <label>
              <span className={styles.label}>Логин</span>
              <Field
                type="text"
                name="login"
                placeholder="Введите логин"
                autoFocus
                as={Input}
              />
            </label>
          </ValidatedFieldWrapper>

          <ValidatedFieldWrapper>
            <ErrorMessage name="password" component="p" />
            <label>
              <span className={styles.label}>Пароль</span>
              <Field
                type="password"
                name="password"
                placeholder="Введите пароль"
                as={Input}
              />
            </label>
          </ValidatedFieldWrapper>

          <Button type="submit" className={styles.btn} disabled={isSubmitting}>
            Далее
          </Button>
        </Form>
      )}
    </AuthFormWrapper>
  );
};

export default Auth;

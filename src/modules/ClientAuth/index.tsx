import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { Block, Button, Input } from '../../UI';

import { useLoginMutation } from '../../services/authApi';
import { ROUTES } from '../../constants/routes';

import styles from './ClientAuth.module.scss';

const loginSchema = object({
  login: string().required('Поле не может быть пустым'),
  password: string().required('Поле не может быть пустым'),
});

const ClientAuth = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  return (
    <Block className={styles.wrapper}>
      <h1>Введите номер телефона</h1>
      <Formik
        initialValues={{ login: '', password: '' }}
        validationSchema={loginSchema}
        validateOnBlur={false}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            await login(values).unwrap();
            navigate('/' + ROUTES.CLIENT.PROFILE);
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
              <ErrorMessage
                className={styles['error-msg']}
                name="login"
                component="p"
              />
              <Field type="text" name="login" placeholder="Логин" as={Input} />
            </div>

            <div>
              <ErrorMessage
                className={styles['error-msg']}
                name="password"
                component="p"
              />
              <Field
                type="password"
                name="password"
                placeholder="Пароль"
                as={Input}
              />
            </div>

            <Button
              type="submit"
              className={styles.btn}
              disabled={isSubmitting}
            >
              Далее
            </Button>
          </Form>
        )}
      </Formik>
    </Block>
  );
};

export default ClientAuth;

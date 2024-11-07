// import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { InferType, object, string } from 'yup';

import { Block, Button } from '../../UI';
import { PhoneInput } from '../../components/PhoneInput';

// import { useLoginMutation } from '../../services/authApi';
// import { ROUTES } from '../../constants/routes';

import styles from './ClientAuth.module.scss';

const phoneSchema = object({
  phone: string()
    .matches(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      'Введите корректный номер телефона'
    )
    .required('Поле не может быть пустым'),
});

interface PhoneFormValues extends InferType<typeof phoneSchema> {}

const ClientAuth = () => {
  // const navigate = useNavigate();
  // const [login] = useLoginMutation();

  return (
    <Block className={styles.wrapper}>
      <h1>Введите номер телефона</h1>
      <Formik<PhoneFormValues>
        initialValues={{ phone: '' }}
        validationSchema={phoneSchema}
        validateOnBlur={false}
        onSubmit={(values) => {
          alert(
            `На ваш номер телефона ${values.phone} отправлен код подтверждения`
          );
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
              <ErrorMessage
                className={styles['error-msg']}
                name="phone"
                component="p"
              />
              <Field
                name="phone"
                as={PhoneInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue('phone', e.target.value)
                }
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

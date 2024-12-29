import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { Button } from '@UI';
import { VerificationCodeInput } from '../VerificationCodeInput';

import styles from './VerificationCodeForm.module.scss';

const verificationCodeSchema = object({
  code: string().required('Обязательно'),
});

interface VerificationCodeFormValues
  extends InferType<typeof verificationCodeSchema> {}

const VerificationCodeForm = () => {
  return (
    <AuthFormWrapper<VerificationCodeFormValues>
      title="Авторизация"
      initialValues={{ code: '' }}
      validationSchema={verificationCodeSchema}
      onSubmit={(values) => {
        console.log(values.code);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <h3 className={styles['input-name']}>
              Код подтверждения <ErrorMessage name="code" component="p" />
            </h3>
            <Field name="code" placeholder="Код" as={VerificationCodeInput} />
          </div>

          <Button type="submit" className={styles.btn} disabled={isSubmitting}>
            Далее
          </Button>
        </Form>
      )}
    </AuthFormWrapper>
  );
};

export default VerificationCodeForm;

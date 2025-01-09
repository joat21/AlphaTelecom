import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { Button, ValidatedFieldWrapper } from '@UI';
import { VerificationCodeInput } from '../VerificationCodeInput';

import styles from '../Auth/Auth.module.scss';

const verificationCodeSchema = object({
  code: string().required('Обязательно'),
});

interface VerificationCodeFormValues
  extends InferType<typeof verificationCodeSchema> {}

const VerificationCodeForm = () => {
  return (
    <AuthFormWrapper<VerificationCodeFormValues>
      title="Введите код подтверждения"
      initialValues={{ code: '' }}
      validationSchema={verificationCodeSchema}
      onSubmit={(values) => {
        console.log(values.code);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <ValidatedFieldWrapper>
            <ErrorMessage name="code" component="p" />
            <Field
              name="code"
              placeholder="Код из Telegram"
              as={VerificationCodeInput}
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

export default VerificationCodeForm;

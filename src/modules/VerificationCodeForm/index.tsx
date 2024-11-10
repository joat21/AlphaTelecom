import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '../../components/AuthFormWrapper';
import { Button, Input } from '../../UI';

import styles from './VerificationCodeForm.module.scss';

const verificationCodeSchema = object({
  code: string().required('Поле не может быть пустым'),
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
          <div>
            <ErrorMessage name="code" component="p" />
            <Field name="code" as={Input} />
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

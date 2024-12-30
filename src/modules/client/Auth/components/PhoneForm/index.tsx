import { FC } from 'react';
import { ErrorMessage, Field, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { AuthFormWrapper } from '@components/AuthFormWrapper';
import { PhoneInput } from '@components/PhoneInput';
import { Button, ValidatedFieldWrapper } from '@UI';

import styles from './PhoneForm.module.scss';

const phoneSchema = object({
  phone: string()
    .matches(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      'Введите корректный номер телефона'
    )
    .required('Поле не может быть пустым'),
});

interface PhoneFormValues extends InferType<typeof phoneSchema> {}
interface PhoneFormProps {
  setIsPhoneSubmitted: (value: boolean) => void;
}

const PhoneForm: FC<PhoneFormProps> = ({ setIsPhoneSubmitted }) => {
  return (
    <AuthFormWrapper<PhoneFormValues>
      title="Введите номер телефона"
      initialValues={{ phone: '' }}
      validationSchema={phoneSchema}
      onSubmit={(values) => {
        alert(
          `На ваш номер телефона ${values.phone} отправлен код подтверждения`
        );
        setIsPhoneSubmitted(true);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <ValidatedFieldWrapper>
            <ErrorMessage name="phone" component="p" />
            <Field
              name="phone"
              as={PhoneInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('phone', e.target.value)
              }
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

export default PhoneForm;

import { FC } from 'react';

import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { InferType, object, string } from 'yup';

import { PassportInput } from '@components/PassportInput';
import { Block, Input, ValidatedFieldWrapper } from '@UI';

import { useRegisterMutation } from '@services/authApi';

import styles from './UserData.module.scss';

const registerSchema = object({
  surname: string().required('Поле не может быть пустым'),
  name: string().required('Поле не может быть пустым'),
  patronymic: string().required('Поле не может быть пустым'),
  passport: string()
    .matches(/^\d{4} \d{6}$/, 'Введите корректные данные')
    .required('Поле не может быть пустым'),
});

interface UserDataFormValues extends InferType<typeof registerSchema> {}
interface UserDataProps {
  formikRef: React.MutableRefObject<any>;
}

export const UserData: FC<UserDataProps> = ({ formikRef }) => {
  const [register] = useRegisterMutation();

  return (
    <Block className={styles.wrapper}>
      <Formik<UserDataFormValues>
        innerRef={formikRef}
        initialValues={{
          surname: '',
          name: '',
          patronymic: '',
          passport: '',
        }}
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
        {() => (
          <Form>
            <ValidatedFieldWrapper>
              <label>
                <span>Фамилия</span>
                <Field name="surname">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type="text"
                      name="surname"
                      placeholder="Иванов"
                      variant="secondary"
                    />
                  )}
                </Field>
              </label>
              <ErrorMessage
                className={styles.error}
                name="surname"
                component="p"
              />
            </ValidatedFieldWrapper>

            <ValidatedFieldWrapper>
              <label>
                <span>Имя</span>
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type="text"
                      name="name"
                      placeholder="Иван"
                      variant="secondary"
                    />
                  )}
                </Field>
              </label>
              <ErrorMessage
                className={styles.error}
                name="name"
                component="p"
              />
            </ValidatedFieldWrapper>

            <ValidatedFieldWrapper>
              <label>
                <span>Отчество</span>
                <Field name="patronymic">
                  {({ field }: FieldProps) => (
                    <Input
                      {...field}
                      type="text"
                      name="patronymic"
                      placeholder="Иванович"
                      variant="secondary"
                    />
                  )}
                </Field>
              </label>

              <ErrorMessage
                className={styles.error}
                name="patronymic"
                component="p"
              />
            </ValidatedFieldWrapper>

            <ValidatedFieldWrapper>
              <label>
                <span>Серия и номер паспорта</span>
                <Field name="passport">
                  {({ field }: FieldProps) => (
                    <PassportInput
                      {...field}
                      type="text"
                      name="passport"
                      placeholder="4032 184348"
                      variant="secondary"
                    />
                  )}
                </Field>
              </label>

              <ErrorMessage
                className={styles.error}
                name="passport"
                component="p"
              />
            </ValidatedFieldWrapper>
          </Form>
        )}
      </Formik>
    </Block>
  );
};

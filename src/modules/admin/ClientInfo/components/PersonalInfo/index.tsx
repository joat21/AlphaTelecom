import React, { FC } from 'react';

import { message } from 'antd';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { InferType, number, object, string } from 'yup';

import { Input, ValidatedFieldWrapper } from '@UI';

import { User } from '@services/authApi';
import { useChangeUserMutation } from '@services/clientsApi';

import styles from './PersonalInfo.module.scss';
import { PhoneInput } from '../../../../../components/PhoneInput';
import { formatPhoneNumber } from '../../../../../helpers';

const fieldSchema = object({
  surname: string().required('Обязательно'),
  name: string().required('Обязательно'),
  patronymic: string().required('Обязательно'),
  phone: string().required('Обязательно'),
  balance: number().required('Обязательно'),
  tariffId: number().required('Обязательно'),
  contractNumber: string().required('Обязательно'),
  id: number().required('Обязательно'),
  passport: string().required('Обязательно'),
  monthlyPayment: number().required('Обязательно'),
});

interface InfoFormValues extends InferType<typeof fieldSchema> {}
interface InfoProps {
  user: User;
  formikRef: React.MutableRefObject<any>;
}

export const PersonalInfo: FC<InfoProps> = ({ user, formikRef }) => {
  const [changeUser] = useChangeUserMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    surname,
    name,
    patronymic,
    phone,
    balance,
    contractNumber,
    id,
    tariffId,
    login,
    role,
    passport,
    monthlyPayment,
  } = user;

  // const {basicServices, unlimitedapps, extraservices, price, title} = tariff
  const intinitialValues = {
    surname,
    name,
    patronymic,
    phone,
    balance,
    tariffId,
    contractNumber,
    id,
    passport,
    monthlyPayment,
  };
  return (
    <>
      {contextHolder}
      <Formik<InfoFormValues>
        innerRef={formikRef}
        initialValues={intinitialValues}
        validationSchema={fieldSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            //library: values(stalo) <> initialValues(bilo) ? only changed fields(tariff -> changeTariff; user -> changeUseR)
            await changeUser({ ...values, login, role }).unwrap();
            messageApi.success({
              content: 'Изменения сохранены',
            });
          } catch (error) {
            messageApi.error({
              content: 'Произошла ошибка. Изменения не сохранены',
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {() => (
          <Form className={styles.form}>
            <h2>Личная информация</h2>
            <div className={styles.column}>
              <ValidatedFieldWrapper>
                <ErrorMessage name="surname" component="p" />
                <label>
                  <span>Фамилия</span>
                  <Field className={styles.field} type="text" name="surname" as={Input} />
                </label>
              </ValidatedFieldWrapper>

              <ValidatedFieldWrapper>
                <ErrorMessage name="name" component="p" />
                <label>
                  <span>Имя</span>
                  <Field className={styles.field} type="text" name="name" as={Input} />
                </label>
              </ValidatedFieldWrapper>

              <ValidatedFieldWrapper>
                <ErrorMessage name="patronymic" component="p" />
                <label>
                  <span>Отчество</span>
                  <Field className={styles.field} type="text" name="patronymic" as={Input} />
                </label>
              </ValidatedFieldWrapper>

              <ValidatedFieldWrapper>
                <ErrorMessage name="passport" component="p" />
                <label>
                  <span>Номер и серия паспорта</span>

                  <Field className={styles.field} type="text" name="passport" as={Input} />
                </label>
              </ValidatedFieldWrapper>

              <ValidatedFieldWrapper>
                <ErrorMessage name="contractNumber" component="p" />
                <label>
                  <span>Номер договора</span>
                  <Field className={styles.field} type="text" name="contractNumber" as={Input} />
                </label>
              </ValidatedFieldWrapper>
              <ValidatedFieldWrapper>
                <ErrorMessage name="status" component="p" />
                <label>
                  <span>Статус</span>
                  <Field
                    className={styles.field}
                    type="text"
                    name="status"
                    value="status"
                    as={Input}
                  />
                </label>
              </ValidatedFieldWrapper>
            </div>
            <h2>Информация о балансе</h2>
            <div className={styles.column}>
              <ValidatedFieldWrapper>
                <ErrorMessage name="phone" component="p" />
                <label>
                  <span>Номер телефона</span>
                  <Field name="phone">
                    {({ field }: FieldProps) => (
                      <PhoneInput
                        {...field}
                        value={formatPhoneNumber(phone)}
                        name="phone"
                        variant="secondary"
                        disabled
                      />
                    )}
                  </Field>
                </label>
              </ValidatedFieldWrapper>
              <ValidatedFieldWrapper>
                <ErrorMessage name="balance" component="p" />
                <label>
                  <span>Баланс</span>
                  <Field className={styles.field} type="text" name="balance" as={Input} disabled />
                </label>
              </ValidatedFieldWrapper>

              <ValidatedFieldWrapper>
                <ErrorMessage name="monthlyPayment" component="p" />
                <label>
                  <span>Ежемесячная плата</span>
                  <Field className={styles.field} type="text" name="monthlyPayment" as={Input} />
                </label>
              </ValidatedFieldWrapper>

              <ValidatedFieldWrapper>
                <ErrorMessage name="balance" component="p" />
                <label>
                  <span>Дата последнего списания</span>
                  <Field className={styles.field} type="text" name="balance" as={Input} disabled />
                </label>
              </ValidatedFieldWrapper>

              <ValidatedFieldWrapper>
                <ErrorMessage name="balance" component="p" />
                <label>
                  <span>Дата следующего списания</span>
                  <Field className={styles.field} type="text" name="balance" as={Input} disabled />
                </label>
              </ValidatedFieldWrapper>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

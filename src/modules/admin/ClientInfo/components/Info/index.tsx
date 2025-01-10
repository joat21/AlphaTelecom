import React, { FC } from 'react';

import { message } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { InferType, number, object, string } from 'yup';

import { Input } from '@UI';

import { User } from '@services/authApi';
import { useChangeUserMutation } from '@services/clientsApi';

import styles from './Info.module.scss';

const FieldSchema = object({
  surname: string().required('Обязательно'),
  name: string().required('Обязательно'),
  patronymic: string().required('Обязательно'),
  phone: string().required('Обязательно'),
  balance: number().required('Обязательно'),
  tariffId: number().required('Обязательно'),
  contractNumber: string().required('Обязательно'),
  id: number().required('Обязательно'),
});

interface InfoFormValues extends InferType<typeof FieldSchema> {}
interface InfoProps {
  user: User;
  formikRef: React.MutableRefObject<any>;
}

export const Info: FC<InfoProps> = ({ user, formikRef }) => {
  const [changeUser] = useChangeUserMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const { surname, name, patronymic, phone, balance, contractNumber, id, tariffId, login, role } =
    user;

  return (
    <>
      {contextHolder}
      <Formik<InfoFormValues>
        innerRef={formikRef}
        initialValues={{
          surname,
          name,
          patronymic,
          phone,
          balance,
          tariffId,
          contractNumber,
          id,
        }}
        validationSchema={FieldSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
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
            <div className={styles.column}>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Фамилия</h3>
                  <ErrorMessage name="surname" component="p" />
                </div>

                <Field className={styles.field} type="text" name="surname" as={Input} />
              </div>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Имя</h3>
                  <ErrorMessage name="name" component="p" />
                </div>

                <Field className={styles.field} type="text" name="name" as={Input} />
              </div>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Отчество</h3>
                  <ErrorMessage name="patronymic" component="p" />
                </div>

                <Field className={styles.field} type="text" name="patronymic" as={Input} />
              </div>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Номер телефона</h3>
                  <ErrorMessage name="phone" component="p" />
                </div>

                <Field className={styles.field} type="text" name="phone" as={Input} />
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Статус</h3>
                  <ErrorMessage name="status" component="p" />
                </div>

                <Field
                  className={styles.field}
                  type="text"
                  name="status"
                  value="status"
                  as={Input}
                />
              </div>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Баланс</h3>
                  <ErrorMessage name="balance" component="p" />
                </div>

                <Field className={styles.field} type="number" name="balance" as={Input} />
              </div>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Тариф</h3>
                  <ErrorMessage name="tariffId" component="p" />
                </div>

                <Field className={styles.field} type="number" name="tariffId" as={Input} />
              </div>
              <div className={styles.block}>
                <div className={styles['input-name']}>
                  <h3>Номер договора</h3>
                  <ErrorMessage name="contractNumber" component="p" />
                </div>

                <Field className={styles.field} type="text" name="contractNumber" as={Input} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

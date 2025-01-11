import { FC } from 'react';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { Modal } from 'antd';
import { Block, Button, Input, ValidatedFieldWrapper } from '@UI';
import { User } from '@services/authApi';
import styles from './TopUpBalanceModal.module.scss';
import { formatPhoneNumber } from 'helpers';
import { BankCard } from '../BankCard';
import { number, object, string } from 'yup';

const paymentSchema = object({
  amount: number().min(100, 'Не менее 100₽'),
  cardNumber: string()
    .matches(/^(?:\d{4} ?){3}\d{4}$/, 'Введите корректные данные')
    .required('Поле не может быть пустым'),
  validityPeriod: string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Введите корректные данные')
    .required('Поле не может быть пустым'),
  cvv: string()
    .matches(/^\d{3}$/, 'Введите корректные данные')
    .required('Обязательно'),
  ownerName: string()
    .matches(
      /^[\u0400-\u04FF\s]+ [\u0400-\u04FF\s]+$/,
      'Введите корректные данные'
    )
    .required('Поле не может быть пустым'),
});

interface TopUpBalanceModalProps {
  user: User;
  isOpen: boolean;
  onCancel(): void;
}

export const TopUpBalanceModal: FC<TopUpBalanceModalProps> = ({
  user,
  isOpen,
  onCancel,
}) => {
  const { id, balance, phone } = user;
  return (
    <Modal open={isOpen} onCancel={onCancel} footer={false}>
      <div className={styles.content}>
        <Block className={styles.card}>
          <svg
            width="80"
            height="81"
            viewBox="0 0 80 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40.5" r="40" fill="#D9D9D9" />
          </svg>
          <div>
            <span>{formatPhoneNumber(phone)}</span>
            <span>Баланс: {balance}₽</span>
          </div>
        </Block>
        <Formik
          initialValues={{
            clientId: id,
            amount: 0,
            paymentMethod: 'card',
            cardNumber: '',
            validityPeriod: '',
            cvv: '',
            ownerName: '',
          }}
          validationSchema={paymentSchema}
          validateOnBlur={false}
          onSubmit={({ amount, clientId, paymentMethod }) =>
            console.log({ amount, clientId, paymentMethod })
          }
        >
          {() => (
            <Form>
              <ValidatedFieldWrapper>
                <label className={styles.label}>
                  <span>Пополнить баланс на:</span>
                  <Field name="amount">
                    {({ field }: FieldProps) => (
                      <Input
                        {...field}
                        name="amount"
                        type="number"
                        min={0}
                        className={styles.amount}
                        variant="secondary"
                      />
                    )}
                  </Field>
                </label>
                <ErrorMessage name="amount" component="p" />
              </ValidatedFieldWrapper>
              <BankCard />
              <Button type="submit" className={styles.btn}>
                Пополнить
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

import { FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import { Block, ValidatedFieldWrapper } from '@UI';
import styles from './BankCard.module.scss';
import { CardNumberInput } from '../CardNumberInput';
import { ValidityPeriodInput } from '../ValidityPeriodInput';
import { CVVInput } from '../CVVInput';
import { OwnerNameInput } from '../OwnerNameInput';

export const BankCard: FC = () => {
  return (
    <Block className={styles.card}>
      <ValidatedFieldWrapper>
        <label>
          <span>Номер карты</span>
          <Field name="cardNumber" as={CardNumberInput} />
        </label>
        <ErrorMessage name="cardNumber" component="p" />
      </ValidatedFieldWrapper>
      <div className={styles.row}>
        <ValidatedFieldWrapper>
          <label>
            <span>Срок действия</span>
            <Field name="validityPeriod" as={ValidityPeriodInput} />
          </label>
          <ErrorMessage name="validityPeriod" component="p" />
        </ValidatedFieldWrapper>
        <ValidatedFieldWrapper>
          <label>
            <span>CVV</span>
            <Field name="cvv" as={CVVInput} />
          </label>
          <ErrorMessage name="cvv" component="p" />
        </ValidatedFieldWrapper>
      </div>
      <ValidatedFieldWrapper>
        <label>
          <span>Имя владельца</span>
          <Field name="ownerName" as={OwnerNameInput} />
        </label>
        <ErrorMessage name="ownerName" component="p" />
      </ValidatedFieldWrapper>
    </Block>
  );
};

import { FC, useRef } from 'react';
import { UserData } from '../UserData';
import styles from './OrderDetails.module.scss';
import { AdditionalInfo } from '../AdditionalInfo';
import { Button } from '@UI';

export const OrderDetails: FC = () => {
  const formikRef = useRef<any>(null);

  return (
    <div className={styles.wrapper}>
      <h2>Для оформления покупки необходимо указать свои паспортные данные</h2>
      <div className={styles.content}>
        <UserData formikRef={formikRef} />
        <div className={styles.right}>
          <AdditionalInfo />
          <Button
            className={styles.btn}
            onClick={() => {
              if (formikRef.current) {
                formikRef.current.submitForm();
              }
            }}
          >
            К оплате
          </Button>
        </div>
      </div>
    </div>
  );
};

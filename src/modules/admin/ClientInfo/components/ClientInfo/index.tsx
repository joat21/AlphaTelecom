import { useRef } from 'react';
import { Info } from '../Info';
import { Button } from '@UI';
import { useFetchUserByIdQuery } from '@services/authApi';

import styles from './ClientInfo.module.scss';

import { useParams } from 'react-router-dom';

export const ClientInfo = () => {
  const { id = '' } = useParams();
  const { data: client, isLoading } = useFetchUserByIdQuery(id);
  const formikRef = useRef<any>(null);
  if (!client || isLoading) return 'Загрузка...';

  return (
    <div className={styles.block}>
      <Info user={client} formikRef={formikRef} />
      <Button
        onClick={() => {
          if (formikRef.current) {
            formikRef.current.submitForm(); // Вызов submitForm
          }
        }}
        className={styles.button}
      >
        Изменить
      </Button>
    </div>
  );
};

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BasicServices } from '../BasicServices';
import { ExtraServices } from '../ExtraServices';
import { UnlimitedTraffic } from '../UnlimitedTraffic';
import { TariffInfo } from '../TariffInfo';

import { fetchConstructorConfig } from '../../store/thunks';

import styles from './TariffConstructor.module.scss';
import { selectConfig } from '../../store/selectors';

export const TariffConstructor: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);

  useEffect(() => {
    dispatch(fetchConstructorConfig());
  }, []);

  if (!config) return 'Загрузка...';

  return (
    <div className={styles['tariff-constructor']}>
      <div className={styles.services}>
        <BasicServices />
        <UnlimitedTraffic />
        <ExtraServices />
      </div>
      <div className={styles.info}>
        <TariffInfo />
      </div>
    </div>
  );
};

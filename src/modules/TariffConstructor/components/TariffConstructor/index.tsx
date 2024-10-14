import { FC } from 'react';
import BasicServices from '../BasicServices';
import { NoLimitTraffic } from '../NoLimitTraffic';
import { ExtraServices } from '../ExtraServices';
import styles from './TariffConstructor.module.scss';

export const TariffConstructor: FC = () => {
  return (
    <div className={styles['tariff-constructor']}>
      <BasicServices />
      <NoLimitTraffic />
      <ExtraServices />
    </div>
  );
};

import { FC } from 'react';

import { BasicServices } from '../BasicServices';
import { ExtraServices } from '../ExtraServices';
import { UnlimitedTraffic } from '../UnlimitedTraffic';

import styles from './TariffConstructor.module.scss';

export const TariffConstructor: FC = () => {
  return (
    <div className={styles['tariff-constructor']}>
      <BasicServices />
      <UnlimitedTraffic />
      <ExtraServices />
    </div>
  );
};

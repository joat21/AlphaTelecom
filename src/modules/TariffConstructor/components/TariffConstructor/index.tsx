import { FC } from 'react';

import { BasicServices } from '../BasicServices';
import { ExtraServices } from '../ExtraServices';
import { UnlimitedTraffic } from '../UnlimitedTraffic';
import { TariffInfo } from '../TariffInfo';

import styles from './TariffConstructor.module.scss';

export const TariffConstructor: FC = () => {
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

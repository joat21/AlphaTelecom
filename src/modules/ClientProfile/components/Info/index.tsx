import { Tariff } from '../Tariff';
import { Balance } from '../Balance';

import { Remains } from '../Remains';
import { Services } from '../Services';

import styles from './Info.module.scss';

export const Info = () => {
  return (
    <div className={styles.block}>
      <Balance />
      <Remains />
      <div className={styles['tariff-services']}>
        <Tariff />
        <Services />
      </div>
    </div>
  );
};

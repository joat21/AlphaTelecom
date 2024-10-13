import { FC } from 'react';
import styles from './BasicServices.module.scss';
import { TariffInfo } from '../TariffInfo';
import { Rangers } from '../Rangers';

const BasicServices: FC = () => {
  return (
    <section className={styles.root}>
      <h2>Основные услуги</h2>
      <div className={styles.services}>
        <Rangers />
        <TariffInfo />
      </div>
    </section>
  );
};

export default BasicServices;

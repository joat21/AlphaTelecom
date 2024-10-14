import { FC } from 'react';
import styles from './BasicServices.module.scss';
import { TariffInfo } from '../TariffInfo';
import { Rangers } from '../Rangers';
import { SectionTitle } from '../SectionTitle';

const BasicServices: FC = () => {
  return (
    <section className={styles.root}>
      <SectionTitle>Основные услуги</SectionTitle>
      <div className={styles.services}>
        <Rangers />
        <TariffInfo />
      </div>
    </section>
  );
};

export default BasicServices;

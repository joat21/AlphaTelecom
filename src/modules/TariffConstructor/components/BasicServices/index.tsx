import { FC, useState } from 'react';
import { InputRange, Block, ToggleSwitch } from '../../../../UI';
import styles from './BasicServices.module.scss';
import { TariffInfo } from '../TariffInfo';
import { Rangers } from '../Rangers';

const BasicServices: FC = ({ services, setServices, price }) => {
  return (
    <section className={styles.root}>
      <h2>Основные услуги</h2>
      <div className={styles.services}>
        <Rangers services={services} setServices={setServices} />
        <TariffInfo services={services} price={price} />
      </div>
    </section>
  );
};

export default BasicServices;

import { Block } from '@UI';
import styles from './Tariff.module.scss';
import { FC } from 'react';

interface TariffProps {
  title: string;
}

export const Tariff: FC<TariffProps> = ({ title }) => {
  return (
    <Block className={styles.block}>
      <h2>Тариф</h2>
      <span>{title}</span>
    </Block>
  );
};

import { FC } from 'react';
import { Block } from '@UI';
import { BasicServiceData } from '@entities/model';
import styles from './RemainsItem.module.scss';

interface RemainsItemProps {
  servicesData: BasicServiceData;
  value: number;
}

export const RemainsItem: FC<RemainsItemProps> = ({ servicesData, value }) => {
  return (
    <Block className={styles.block}>
      <p>{servicesData.label}</p>
      <p className={styles.value}>
        {value} {servicesData.measureUnit}
      </p>
    </Block>
  );
};

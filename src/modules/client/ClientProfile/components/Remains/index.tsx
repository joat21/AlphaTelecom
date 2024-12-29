import { FC } from 'react';

import { Block } from '@UI';
import { RemainsItem } from '../RemainsItem';

import { BasicServiceData, Remainder } from '@entities/model';

import styles from './Remains.module.scss';

interface RemainsProps {
  servicesData: Record<string, BasicServiceData>;
  remainsData: Remainder;
}

export const Remains: FC<RemainsProps> = ({ servicesData, remainsData }) => {
  const { internet, minutes, sms } = remainsData;

  const remainsArray = Object.entries({
    internet,
    minutes,
    sms,
  });

  return (
    <Block className={styles.block}>
      <h2>ОСТАТКИ</h2>
      <ul>
        {remainsArray.map(([key, value]) => (
          <li key={key}>
            <RemainsItem value={value} servicesData={servicesData[key]} />
          </li>
        ))}
      </ul>
    </Block>
  );
};

import { Block } from '@UI';
import styles from './Tariff.module.scss';

export const Tariff = () => {
  return (
    <Block className={styles.block}>
      <h2>Тариф</h2>
      <span>Название</span>
    </Block>
  );
};

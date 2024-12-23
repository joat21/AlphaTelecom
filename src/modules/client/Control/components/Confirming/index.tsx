import { FC } from 'react';
import { Block, Button } from '@UI';
import styles from './TotalSum.module.scss';

export const Confirming: FC = () => {
  return (
    <Block className={styles.block}>
      <div className={styles.header}>
        <h2>УБЕДИТЕСЬ, ЧТО ВЫ ВЫБРАЛИ НУЖНЫЙ ТАРИФ</h2>
      </div>
      <Button className={styles.button}>СМЕНИТЬ ТАРИФ</Button>
    </Block>
  );
};

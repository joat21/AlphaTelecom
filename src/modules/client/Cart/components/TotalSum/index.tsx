import { FC } from 'react';
import { Block, Button } from '@UI';
import styles from './TotalSum.module.scss';

interface TotalSumProps {
  totalPrice: number;
}

export const TotalSum: FC<TotalSumProps> = ({ totalPrice }) => {
  return (
    <Block className={styles.block}>
      <div className={styles.header}>
        <h2>Итого:</h2>
        <span>{totalPrice} ₽/МЕС</span>
      </div>
      <div className={styles.div}>
        <Button className={styles.button} to={'/userdata-form'}>
          К ОФОРМЛЕНИЮ
        </Button>
      </div>
    </Block>
  );
};

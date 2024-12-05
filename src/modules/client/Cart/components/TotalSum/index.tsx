import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Block, Button } from '@UI';
import { selectCart } from '../../store/selectors';
import styles from './TotalSum.module.scss';

export const TotalSum: FC = () => {
  const { totalPrice } = useSelector(selectCart);

  return (
    <Block className={styles.block}>
      <div className={styles.header}>
        <h2>Итого:</h2>
        <span>{totalPrice} ₽</span>
      </div>
      <Button className={styles.button} to={'/userdata-form'}>
        К ОФОРМЛЕНИЮ
      </Button>
    </Block>
  );
};

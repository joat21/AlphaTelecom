import React, { FC, useState } from 'react';
import { Block, Button } from '../../../../UI';
import styles from './TotalSum.module.scss';
import { useSelector } from 'react-redux';
import { selectCart } from '../../store/selectors';

export const TotalSum: FC = () => {
  const { totalPrice } = useSelector(selectCart);

  return (
    <Block className={styles.block}>
      <div className={styles.header}>
        <h2>Итого:</h2>
        <span>{totalPrice} ₽</span>
      </div>
      <Button className={styles.button}>К ОФОРМЛЕНИЮ</Button>
    </Block>
  );
};

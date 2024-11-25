import React from 'react';
import { Block } from '../../../../UI';
import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
  return (
    <div className={styles.div}>
      <h1>Корзина пустая</h1>
    </div>
  );
};

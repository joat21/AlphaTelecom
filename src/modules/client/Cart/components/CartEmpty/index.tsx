import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
  return (
    <div className={styles.div}>
      <h1>Корзина пустая</h1>
    </div>
  );
};

import styles from './BalanceBlock.module.scss';

export const BalanceBlock = () => {
  return (
    <div className={styles.redblock}>
      <h1>Баланс</h1>
      <button>Пополнить баланс</button>
      <button>Обещанный баланс</button>
    </div>
  );
};

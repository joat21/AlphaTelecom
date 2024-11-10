import { Block, Button } from '../../../../UI';
import { useSelector } from 'react-redux';
import styles from './Balance.module.scss';
import { selectUser } from '../../../../store/Auth/selectors';

export const Balance = () => {
  const user = useSelector(selectUser);

  return (
    <Block className={styles.block}>
      <h2>БАЛАНС</h2>
      <Block className={styles['red-block']}>
        <span>{user?.balance}₽</span>
        <div>
          <Button className={styles['add-balance-button']}>Пополнить баланс</Button>
          <Button className={styles['promised-balance-button']}>Обещанный баланс</Button>
        </div>
      </Block>
    </Block>
  );
};

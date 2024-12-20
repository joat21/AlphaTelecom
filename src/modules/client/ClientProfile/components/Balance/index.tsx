import { useSelector } from 'react-redux';
import { Block, Button } from '@UI';
import styles from './Balance.module.scss';
import { RootState } from '@store/store';
import { jwtDecode } from 'jwt-decode';
import { User } from '@services/authApi';

export const Balance = () => {
  const { activeUserId, tokens } = useSelector(
    (state: RootState) => state.auth
  );
  const { balance } = jwtDecode<User>(tokens[activeUserId!]);

  return (
    <Block className={styles.block}>
      <h2>БАЛАНС</h2>
      <Block className={styles['red-block']}>
        <span>{balance}₽</span>
        <div>
          <Button className={styles['add-balance-button']}>
            Пополнить баланс
          </Button>
          <Button className={styles['promised-balance-button']}>
            Обещанный баланс
          </Button>
        </div>
      </Block>
    </Block>
  );
};

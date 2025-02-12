import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { Block, Button } from '@UI';

import { User } from '@services/authApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './Balance.module.scss';
import { FC } from 'react';

interface BalanceProps {
  onModalOpen(): void;
}

export const Balance: FC<BalanceProps> = ({ onModalOpen }) => {
  const { activeUserId, tokens } = useSelector(selectAuth);
  const { balance } = jwtDecode<User>(tokens[activeUserId!]);

  return (
    <Block className={styles.block}>
      <h2>БАЛАНС</h2>
      <Block className={styles['red-block']}>
        <span>{balance}₽</span>
        <div>
          <Button
            className={styles['add-balance-button']}
            variant="alternative"
            onClick={onModalOpen}
          >
            Пополнить баланс
          </Button>
          <Button
            className={styles['promised-balance-button']}
            variant="alternative"
          >
            Обещанный платеж
          </Button>
        </div>
      </Block>
    </Block>
  );
};

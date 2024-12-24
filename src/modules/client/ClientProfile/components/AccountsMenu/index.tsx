import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Button, Container } from '@UI';
import { AccountsList } from '../AccountsList';
import { AccountsModal } from '../AccountsModal';

import { removeToken } from '@store/Auth/slice';
import { selectAuth } from '@store/Auth/selectors';

import styles from './AccountsMenu.module.scss';

export const AccountsMenu = () => {
  const dispatch = useDispatch();
  const { activeUserId } = useSelector(selectAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Block className={styles.block}>
      <Container className={styles.wrapper}>
        <AccountsList />
        <Button
          className={styles['button-plus']}
          onClick={() => setIsModalOpen(true)}
        >
          +
        </Button>
        <AccountsModal
          onCancel={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          onLogout={() => dispatch(removeToken(activeUserId!))}
        />
      </Container>
    </Block>
  );
};

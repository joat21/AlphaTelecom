import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'antd';
import { Block, Button, Container } from '@UI';
import { AccountsList } from '../AccountsList';

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
        <Modal
          onCancel={() => setIsModalOpen(false)}
          title="Выберите действие"
          open={isModalOpen}
          footer={[
            <div key="footer" style={{ display: 'flex', gap: 20 }}>
              <Button
                onClick={() => {
                  dispatch(removeToken(activeUserId!));
                }}
                to="/admin-auth"
              >
                Сменить аккаунт
              </Button>
              <Button to="/admin-auth">Добавить аккаунт</Button>
            </div>,
          ]}
        />
      </Container>
    </Block>
  );
};

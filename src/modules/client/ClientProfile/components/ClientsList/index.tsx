import { Contacts } from '../Contacts';
import { Block, Button, Container } from '@UI';
import styles from './ClientsList.module.scss';
import { Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '@store/Auth/slice';
import { selectUser } from '@store/Auth/selectors';

export const ClientsList = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Block className={styles.block}>
      <Container className={styles.wrapper}>
        <Contacts />
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
                  dispatch(removeToken(user?.id!));
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

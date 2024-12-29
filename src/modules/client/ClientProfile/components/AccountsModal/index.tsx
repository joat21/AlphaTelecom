import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from 'antd';
import { Button } from '@UI';

import { formatPhoneNumber } from 'helpers';
import { User } from '@services/authApi';
import { changeActiveUserId } from '@store/Auth/slice';

import styles from './AccountsModal.module.scss';

interface AccountsModal {
  onCancel(): void;
  isOpen: boolean;
  onLogout(id: number): void;
  userProfiles: User[];
  activeUserId: number;
}

export const AccountsModal: FC<AccountsModal> = ({
  onCancel,
  isOpen,
  onLogout,
  userProfiles,
  activeUserId,
}) => {
  const dispatch = useDispatch();

  const handleChangeAccount = (id: number) => {
    dispatch(changeActiveUserId(id));
    onCancel();
  };

  return (
    <Modal
      onCancel={onCancel}
      title="Что вы хотите сделать?"
      open={isOpen}
      width={400}
      footer={
        <div className={styles.footer}>
          <Button
            className={styles.btn}
            onClick={() => onLogout(activeUserId)}
            to="/admin-auth"
          >
            Войти в другой аккаунт
          </Button>
          <Button className={styles.btn} to="/admin-auth">
            Добавить аккаунт
          </Button>
        </div>
      }
    >
      <h2 className={styles['accounts-title']}>Выбрать другой аккаунт:</h2>
      <div className={styles.accounts}>
        {userProfiles.map((user) => (
          <Button
            className={styles.btn}
            key={user.id}
            variant="secondary"
            onClick={() => handleChangeAccount(user.id)}
          >
            {formatPhoneNumber(user.phone)}
          </Button>
        ))}
      </div>
    </Modal>
  );
};

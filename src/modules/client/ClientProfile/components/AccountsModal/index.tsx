import { FC } from 'react';

import { Modal } from 'antd';
import { Button } from '@UI';
import { AccountCard } from '../AccountCard';

import { User } from '@services/authApi';

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
  return (
    <Modal
      onCancel={onCancel}
      title="Выберите действие"
      open={isOpen}
      footer={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Button onClick={() => onLogout(activeUserId)} to="/admin-auth">
            Сменить аккаунт
          </Button>
          <Button to="/admin-auth">Добавить аккаунт</Button>
        </div>
      }
    >
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {userProfiles.map((user) => (
          <AccountCard
            key={user.id}
            user={user}
            activeUserId={activeUserId}
            onLogout={onLogout}
            onCancelModal={onCancel}
          />
        ))}
      </ul>
    </Modal>
  );
};

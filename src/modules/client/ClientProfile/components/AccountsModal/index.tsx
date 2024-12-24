import { FC } from 'react';
import { Modal } from 'antd';
import { Button } from '@UI';

interface AccountsModal {
  onCancel(): void;
  isOpen: boolean;
  onLogout(): void;
}

export const AccountsModal: FC<AccountsModal> = ({
  onCancel,
  isOpen,
  onLogout,
}) => {
  return (
    <Modal
      onCancel={onCancel}
      title="Выберите действие"
      open={isOpen}
      footer={
        <div style={{ display: 'flex', gap: 20 }}>
          <Button onClick={onLogout} to="/admin-auth">
            Сменить аккаунт
          </Button>
          <Button to="/admin-auth">Добавить аккаунт</Button>
        </div>
      }
    />
  );
};

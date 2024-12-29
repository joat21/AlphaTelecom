import React from 'react';
import { Modal } from 'antd';
import { Button } from '@UI';
import { TariffWithImage } from '@entities/model';
import styles from './TariffActionModal.module.scss';

interface TariffActionModalProps {
  isOpen: boolean;
  tariff: TariffWithImage;
  onCancel(): void;
  onAddTariffToCart: () => void;
}

export const TariffActionModal: React.FC<TariffActionModalProps> = ({
  isOpen,
  tariff,
  onCancel,
  onAddTariffToCart,
}) => {
  const handleAddTariffTocard = () => {
    onAddTariffToCart();
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
          <Button className={styles.btn} state={{ tariff }} to="/change-tariff">
            Сменить тариф
          </Button>
          <Button className={styles.btn} onClick={handleAddTariffTocard}>
            Купить сим-карту другому
          </Button>
        </div>
      }
    />
  );
};

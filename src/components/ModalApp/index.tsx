import React from 'react';
import { Modal as AntDModal } from 'antd';
import { Button } from '../../UI';
import { TariffWithImage } from '../../entities/model';

interface ModalProps {
  isModalOpen: boolean;
  onClickAdd: () => void;
  handleCancel: () => void;
  tariff: TariffWithImage;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, handleCancel, onClickAdd, tariff }) => {
  return (
    <AntDModal
      onCancel={handleCancel}
      title="Выберите действие"
      open={isModalOpen}
      footer={[
        <div key="footer" style={{ display: 'flex' }}>
          <Button onClick={onClickAdd}>Купить тариф</Button>
          <Button state={{ tariff }} to="/change-tariff">
            Сменить тариф
          </Button>
        </div>,
      ]}
    >
      <p>Купить - SIM-карта + данный тариф</p>
      <p>Сменить - смена текущего тарифа на данный</p>
    </AntDModal>
  );
};

export default Modal;

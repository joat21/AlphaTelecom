import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';
import Modal from '@components/ModalApp';

import { selectTariff } from '@store/TariffConstructor/selectors';
import { useAddItemMutation } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './TariffInfo.module.scss';

export const TariffInfo: FC = () => {
  const { activeUserId, guestId } = useSelector(selectAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addItem] = useAddItemMutation();
  const tariff = useSelector(selectTariff);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addTariffToCart = () =>
    addItem({
      tariff: { ...tariff, imageUrl: '' },
      userId: (activeUserId ?? guestId)!,
    });

  const onClickAdd = () => {
    if (activeUserId) {
      showModal();
    } else {
      addTariffToCart();
    }
  };

  return (
    <Block className={styles.info}>
      <div className={styles.left}>
        <div className={styles.services}>
          <h3 className={styles.title}>Ваш тариф:</h3>
          <ServicesList tariff={tariff} isTitlesVisible={true} />
        </div>
        <span className={styles.price}>Итого: {tariff.price} ₽/МЕС.</span>
      </div>
      <Button className={styles.btn} onClick={onClickAdd}>
        Купить
      </Button>
      <Modal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        tariff={{ ...tariff, imageUrl: '' }}
        onClickAdd={() => {
          addTariffToCart();
          handleCancel();
        }}
      />
    </Block>
  );
};

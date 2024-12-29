import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';
import { TariffActionModal } from '@components/TariffActionModal';

import { selectTariff } from '@store/TariffConstructor/selectors';
import { useAddItemMutation } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './TariffInfo.module.scss';

export const TariffInfo: FC = () => {
  const { activeUserId, guestId } = useSelector(selectAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addItem] = useAddItemMutation();
  const tariff = useSelector(selectTariff);

  const addTariffToCart = () =>
    addItem({
      tariff: { ...tariff, imageUrl: '' },
      userId: (activeUserId ?? guestId)!,
    });

  const onClickAdd = () => {
    if (activeUserId) {
      setIsModalOpen(true);
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
      <TariffActionModal
        isOpen={isModalOpen}
        tariff={{ ...tariff, imageUrl: '' }}
        onCancel={() => setIsModalOpen(false)}
        onAddTariffToCart={addTariffToCart}
      />
    </Block>
  );
};

import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';
import Modal from '@components/ModalApp';

import { TariffWithImage } from '@entities/model';
import { useAddItemMutation } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './TariffCard.module.scss';

interface TariffCardProps {
  tariff: TariffWithImage;
}

const TariffCard: FC<TariffCardProps> = ({ tariff }) => {
  const { activeUserId, guestId } = useSelector(selectAuth);
  const [addItem] = useAddItemMutation();
  const { id, title, price, imageUrl } = tariff;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addTariffToCart = () =>
    addItem({
      tariff,
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
    <Block
      className={styles.card}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      as="article"
    >
      <Link className={styles.card__link} to={`/tariffs/${id}`} />
      <div className={styles.card__info}>
        <h2
          className={styles.card__title}
          style={{ color: classNames({ 'var(--red)': id === 5 }) }}
        >
          {title}
        </h2>
        <ServicesList tariff={tariff!} isTitlesVisible={false} />
      </div>
      <Button className={styles.card__btn} onClick={onClickAdd}>
        {`Купить ${price}₽/мес`}
      </Button>
      <Modal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        tariff={tariff}
        onClickAdd={() => {
          addTariffToCart();
          handleCancel();
        }}
      />
    </Block>
  );
};

export default TariffCard;

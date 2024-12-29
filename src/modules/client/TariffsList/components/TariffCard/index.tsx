import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';
import { TariffActionModal } from '@components/TariffActionModal';

import { ServicesDataState, TariffWithImage } from '@entities/model';
import { useAddItemMutation } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './TariffCard.module.scss';

interface TariffCardProps {
  tariff: TariffWithImage;
  servicesData: ServicesDataState;
}

const TariffCard: FC<TariffCardProps> = ({ tariff, servicesData }) => {
  const { activeUserId, guestId } = useSelector(selectAuth);
  const [addItem] = useAddItemMutation();
  const { id, title, price, imageUrl } = tariff;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTariffToCart = () =>
    addItem({
      tariff,
      userId: (activeUserId ?? guestId)!,
    });

  const handleAddTariffToCart = () => {
    if (activeUserId) {
      setIsModalOpen(true);
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
        <ServicesList
          tariff={tariff!}
          isTitlesVisible={false}
          servicesData={servicesData}
        />
      </div>
      <Button className={styles.card__btn} onClick={handleAddTariffToCart}>
        {`Купить ${price}₽/мес`}
      </Button>
      <TariffActionModal
        isOpen={isModalOpen}
        tariff={tariff}
        onCancel={() => setIsModalOpen(false)}
        onAddTariffToCart={addTariffToCart}
      />
    </Block>
  );
};

export default TariffCard;

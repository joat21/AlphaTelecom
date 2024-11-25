import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';

import { TariffWithImage } from '@entities/model';

import styles from './TariffCard.module.scss';

interface TariffCardProps {
  tariff: TariffWithImage;
}

const TariffCard: FC<TariffCardProps> = ({ tariff }) => {
  const { id, title, price, imageUrl } = tariff;
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
      <Button className={styles.card__btn}>{`Купить ${price}₽/мес`}</Button>
    </Block>
  );
};

export default TariffCard;

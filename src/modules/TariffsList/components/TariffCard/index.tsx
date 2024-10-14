import { FC } from 'react';
import classNames from 'classnames';
import { Block, Button } from '../../../../UI';
import styles from './TariffCard.module.scss';
import { Link } from 'react-router-dom';
import ServicesList from '../../../../components/ServicesList';

interface TariffCardProps {
  id: number;
  title: string;
  imageUrl: string;
  basic: {
    internet: number;
    minutes: number;
    sms: number;
  };
  noLimits: {
    noLimitSocial: boolean;
    noLimitVideo: boolean;
    noLimitMusic: boolean;
  };
  extra: {
    intercityCalls: boolean;
  };
  price?: number;
}

const TariffCard: FC<TariffCardProps> = ({
  id,
  imageUrl,
  title,
  basic,
  noLimits,
  extra,
  price,
}) => {
  const info = basic ? (
    <>
      <ServicesList tariff={{ basic, noLimits, extra }} isTitlesVisible={false} />
    </>
  ) : (
    <span>
      Настройте тариф
      <br />
      под свои интересы
    </span>
  );

  return (
    <Block className={styles.card} style={{ backgroundImage: `url(${imageUrl})` }}>
      <article>
        <Link
          className={styles.card__link}
          to={id === 6 ? '/tariff-constructor' : `/tariffs/${id}`}
        />
        <div className={styles.card__info}>
          <h2
            className={styles.card__title}
            style={{ color: classNames({ 'var(--red)': id === 5 }) }}
          >
            {title}
          </h2>
          {info}
        </div>
        <Button className={styles.card__btn}>{basic ? `Купить ${price}₽/мес` : 'Настроить'}</Button>
      </article>
    </Block>
  );
};

export default TariffCard;

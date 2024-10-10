import { FC } from 'react';
import classNames from 'classnames';
import { Button } from '../../UI';
import styles from './TariffCard.module.scss';
import { Link } from 'react-router-dom';

type Services = {
  internet: number;
  minutes: number;
  sms: number;
};

interface TariffCardProps {
  id: number;
  title: string;
  imageUrl: string;
  services?: Services;
  price?: number;
}

const TariffCard: FC<TariffCardProps> = ({
  id,
  imageUrl,
  title,
  services,
  price,
}) => {
  const info = services ? (
    <>
      <span>{services.internet} ГБ</span>
      <span>{services.minutes} МИН</span>
      <span>{services.sms} СМС</span>
    </>
  ) : (
    <span>
      Настройте тариф
      <br />
      под свои интересы
    </span>
  );

  return (
    <article
      className={styles.card}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Link className={styles.card__link} to={`/tariffs/${id}`} />
      <div className={styles.card__info}>
        <h2
          className={styles.card__title}
          style={{ color: classNames({ 'var(--red)': id === 5 }) }}
        >
          {title}
        </h2>
        {info}
      </div>
      <Button className={styles.card__btn}>
        {services ? `Купить ${price}₽/мес` : 'Настроить'}
      </Button>
    </article>
  );
};

export default TariffCard;

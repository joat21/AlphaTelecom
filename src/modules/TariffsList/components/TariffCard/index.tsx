import { FC } from 'react';
import classNames from 'classnames';
import { Block, Button } from '../../../../UI';
import styles from './TariffCard.module.scss';
import { Link } from 'react-router-dom';
import ServicesList from '../../../../components/ServicesList';
import { TariffWithImage } from '../../../../entities/model';
import { useDispatch } from 'react-redux';
import { addItem } from '@modules/client/Cart/store/slice';

interface TariffCardProps {
  tariff: TariffWithImage;
}

const TariffCard: FC<TariffCardProps> = ({ tariff }) => {
  const { id, title, basicServices, price, imageUrl } = tariff;

  const info = basicServices ? (
    <>
      <ServicesList tariff={tariff} isTitlesVisible={false} />
    </>
  ) : (
    <span>
      Настройте тариф
      <br />
      под свои интересы
    </span>
  );
  const dispatch = useDispatch();

  const onClickAdd = () => {
    dispatch(addItem(tariff));
  };
  return (
    <Block
      className={styles.card}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
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
        <Button onClick={onClickAdd} className={styles.card__btn} to="/cart">
          {basicServices ? `Купить ${price}₽/мес` : 'Настроить'}
        </Button>
      </article>
    </Block>
  );
};

export default TariffCard;

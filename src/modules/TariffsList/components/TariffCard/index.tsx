import { FC } from 'react';
import classNames from 'classnames';
import { Block, Button } from '../../../../UI';
import styles from './TariffCard.module.scss';
import { Link } from 'react-router-dom';
import ServicesList from '../../../../components/ServicesList';
import { TariffWithImage } from '../../../../entities/model';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../Cart/store/slice';

interface TariffCardProps extends TariffWithImage {}

const TariffCard: FC<TariffCardProps> = ({
  id,
  imageUrl,
  title,
  basicServices,
  unlimitedApps,
  extraServices,
  price,
}) => {
  const info = basicServices ? (
    <>
      <ServicesList
        tariff={{
          id,
          title,
          basicServices,
          unlimitedApps,
          extraServices,
          price,
        }}
        isTitlesVisible={false}
      />
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
    dispatch(addItem({ id, title, basicServices, unlimitedApps, extraServices, price, imageUrl }));
  };
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
        <Button onClick={onClickAdd} className={styles.card__btn} to="/cart">
          {basicServices ? `Купить ${price}₽/мес` : 'Настроить'}
        </Button>
      </article>
    </Block>
  );
};

export default TariffCard;

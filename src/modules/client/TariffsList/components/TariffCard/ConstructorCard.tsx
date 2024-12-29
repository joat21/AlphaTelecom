import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Block, Button } from '@UI';

import constructorBGImage from '@assets/img/tariffs/puzzle.svg';
import { ROUTES } from '@constants/routes';

import styles from './TariffCard.module.scss';

const ConstructorCard: FC = () => {
  return (
    <Block
      className={styles.card}
      style={{
        backgroundImage: `url(${constructorBGImage})`,
      }}
      as="article"
    >
      <Link
        className={styles.card__link}
        to={'/' + ROUTES.PUBLIC.TARIFF_CONSTRUCTOR}
      />
      <div className={styles.card__info}>
        <h2 className={styles.card__title}>Конструктор</h2>
        <span>
          Настройте тариф
          <br />
          под свои интересы
        </span>
      </div>
      <Button
        className={styles.card__btn}
        to={'/' + ROUTES.PUBLIC.TARIFF_CONSTRUCTOR}
      >
        Настроить
      </Button>
    </Block>
  );
};

export default ConstructorCard;

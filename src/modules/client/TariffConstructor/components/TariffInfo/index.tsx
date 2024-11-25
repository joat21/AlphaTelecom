import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';

import { selectTariff } from '@store/TariffConstructor/selectors';

import styles from './TariffInfo.module.scss';

export const TariffInfo: FC = () => {
  const tariff = useSelector(selectTariff);
  const { id, title, price } = tariff;

  return (
    <Block className={styles.info}>
      <div className={styles.left}>
        <div className={styles.services}>
          <h3 className={styles.title}>Ваш тариф:</h3>
          <ServicesList tariff={tariff} isTitlesVisible={true} />
        </div>
        <span className={styles.price}>Итого: {price} ₽/МЕС.</span>
      </div>
      <Button className={styles.btn} to="/cart" state={{ id, title, price }}>
        Купить
      </Button>
    </Block>
  );
};

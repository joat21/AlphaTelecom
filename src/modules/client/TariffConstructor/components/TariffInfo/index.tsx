import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';

import { selectTariff } from '../../store/selectors';

import styles from './TariffInfo.module.scss';

export const TariffInfo: FC = () => {
  const tariff = useSelector(selectTariff);

  return (
    <Block className={styles.info}>
      <div className={styles.left}>
        <div className={styles.services}>
          <h3 className={styles.title}>Ваш тариф:</h3>
          <ServicesList tariff={tariff} isTitlesVisible={true} />
        </div>
        <span className={styles.price}>Итого: {tariff.price} ₽/МЕС.</span>
      </div>
      <Button className={styles.btn} to="/cart">
        Купить
      </Button>
    </Block>
  );
};

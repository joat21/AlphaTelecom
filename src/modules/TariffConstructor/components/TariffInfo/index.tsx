import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Block, Button } from '../../../../UI';
import ServicesList from '../../../../components/ServicesList';

import { RootState } from '../../../../store/store';

import styles from './TariffInfo.module.scss';

export const TariffInfo: FC = () => {
  const tariff = useSelector((state: RootState) => state.tariffConstructor.tariff);

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

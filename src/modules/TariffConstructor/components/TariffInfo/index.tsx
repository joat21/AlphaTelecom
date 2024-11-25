import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTariff } from '@store/TariffConstructor/selectors';
import { addItem } from '@modules/client/Cart/store/slice';
import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';

import styles from './TariffInfo.module.scss';

export const TariffInfo: FC = () => {
  const tariff = useSelector(selectTariff);
  const { price } = tariff;
  const dispatch = useDispatch();

  const onClickAdd = () => {
    dispatch(addItem({ ...tariff, imageUrl: '' }));
  };
  return (
    <Block className={styles.info}>
      <div className={styles.left}>
        <div className={styles.services}>
          <h3 className={styles.title}>Ваш тариф:</h3>
          <ServicesList tariff={tariff} isTitlesVisible={true} />
        </div>
        <span className={styles.price}>Итого: {price} ₽/МЕС.</span>
      </div>
      <Button onClick={onClickAdd} className={styles.btn} to="/cart">
        Купить
      </Button>
    </Block>
  );
};

import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Button } from '@UI';
import ServicesList from '@components/ServicesList';

import { selectTariff } from '@store/TariffConstructor/selectors';
import { addItem } from '@modules/client/Cart/store/slice';

import styles from './TariffInfo.module.scss';

export const TariffInfo: FC = () => {
  const dispatch = useDispatch();
  const tariff = useSelector(selectTariff);

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
        <span className={styles.price}>Итого: {tariff.price} ₽/МЕС.</span>
      </div>
      <Button className={styles.btn} onClick={onClickAdd} to="/cart">
        Купить
      </Button>
    </Block>
  );
};

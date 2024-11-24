import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Button } from '../../../../UI';
import ServicesList from '../../../../components/ServicesList';

import { selectTariff } from '../../store/selectors';

import styles from './TariffInfo.module.scss';
import { addItem } from '../../../Cart/store/slice';

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

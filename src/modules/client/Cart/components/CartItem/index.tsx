import React from 'react';

import { BasicServicesList } from '@components/BasicServicesList';
import { ServiceIconsList } from '@components/ServiceIconsList';
import { Block, Button } from '@UI';

import { ServicesDataState, TariffWithImage } from '@entities/model';

import styles from './CartItem.module.scss';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../store/slice';
// import { removeItem } from '../../store/slice';
// import { useDispatch } from 'react-redux';

interface CartItemProps extends TariffWithImage {
  servicesData: ServicesDataState[];
}

export const CartItem: React.FC<CartItemProps> = ({
  unlimitedApps,
  extraServices,
  title,
  price,
  basicServices,
  servicesData,
  id,
}) => {
  const unlimitedAppsValuesArray = Object.values(unlimitedApps);
  const extraServicesValuesArray = Object.values(extraServices);

  const dispatch = useDispatch();
  const onClickRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <Block className={styles.block}>
      <div className={styles.services}>
        <div className={styles.services__header}>
          <h2>Тариф: {title}</h2>
          <span>{price} ₽/МЕС.</span>
        </div>
        <div>
          <BasicServicesList services={basicServices} />
        </div>
      </div>

      <div className={styles.includes}>
        <div className={styles.includes__header}>
          <h2>ВКЛЮЧЕНО:</h2>
        </div>
        <div className={styles.includes__items}>
          {unlimitedAppsValuesArray.some((value) => value) && (
            <div>
              <h2>БЕЗЛИМИТ</h2>
              <ServiceIconsList
                services={unlimitedApps}
                servicesData={servicesData[0].unlimitedAppsData}
              />
            </div>
          )}
          {extraServicesValuesArray.some((value) => value) && (
            <div>
              <h2>ДОПОЛНИТЕЛЬНО</h2>
              <ServiceIconsList
                services={extraServices}
                servicesData={servicesData[0].extraServicesData}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.number}>
        <span>БЕСПЛАТНЫЙ НОМЕР </span>
        <span>+7 999 000 00 00 </span>
      </div>
      <Button onClick={onClickRemove}>Удалить</Button>
    </Block>
  );
};

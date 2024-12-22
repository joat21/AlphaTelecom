import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

import { BasicServicesList } from '@components/BasicServicesList';
import { ServiceIconsList } from '@components/ServiceIconsList';
import { Block } from '@UI';

import { ServicesDataState } from '@entities/model';

import styles from './CartItem.module.scss';
import {
  CartItem as CartItemType,
  useRemoveItemMutation,
} from '@services/cartApi';

interface CartItemProps extends CartItemType {
  servicesData: ServicesDataState[];
}

export const CartItem: React.FC<CartItemProps> = ({
  unlimitedApps,
  extraServices,
  title,
  price,
  basicServices,
  servicesData,
  cartId,
  phone,
  index,
}) => {
  const unlimitedAppsValuesArray = Object.values(unlimitedApps);
  const extraServicesValuesArray = Object.values(extraServices);
  const [removeItem] = useRemoveItemMutation();

  const onClickRemove = async () => {
    await removeItem(cartId).unwrap();
  };

  return (
    <Block className={styles.block}>
      <CloseOutlined onClick={onClickRemove} className={styles.delete} />
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
        <span>БЕСПЛАТНЫЙ НОМЕР</span>
        <span>{phone}</span>
      </div>
    </Block>
  );
};

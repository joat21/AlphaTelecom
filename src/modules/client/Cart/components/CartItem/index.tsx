import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

import { BasicServicesList } from '@components/BasicServicesList';
import { ServiceIconsList } from '@components/ServiceIconsList';
import { Block } from '@UI';

import { ServicesDataState } from '@entities/model';
import { formatPhoneNumber } from 'helpers';

import {
  CartItem as CartItemType,
  useRemoveItemMutation,
} from '@services/cartApi';
import styles from './CartItem.module.scss';

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

      {(unlimitedAppsValuesArray.some((value) => value) ||
        extraServicesValuesArray.some((value) => value)) && (
        <div className={styles.includes}>
          {unlimitedAppsValuesArray.some((value) => value) && (
            <div>
              <h2>Безлимит</h2>
              <ServiceIconsList
                services={unlimitedApps}
                servicesData={servicesData[0].unlimitedAppsData}
              />
            </div>
          )}
          {extraServicesValuesArray.some((value) => value) && (
            <div>
              <h2>Дополнительно</h2>
              <ServiceIconsList
                services={extraServices}
                servicesData={servicesData[0].extraServicesData}
              />
            </div>
          )}
        </div>
      )}

      <div className={styles['phone-wrapper']}>
        <span>Бесплатный номер</span>
        <span className={styles.phone}>{formatPhoneNumber(phone)}</span>
      </div>
    </Block>
  );
};

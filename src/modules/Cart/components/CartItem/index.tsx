import { Block } from '../../../../UI';

import React from 'react';
import styles from './CartItem.module.scss';
import { ServicesDataState, TariffWithImage } from '../../../../entities/model';
import { ServiceIconsList } from '../../../../components/ServiceIconsList';
import { BasicServicesList } from '../../../../components/BasicServicesList';

interface CartItemProps extends TariffWithImage {
  servicesData: ServicesDataState[];
}

export const CartItem: React.FC<CartItemProps> = ({
  unlimitedApps,
  extraServices,
  id,
  title,
  price,
  basicServices,
  servicesData,
}) => {
  const unlimitedAppsValuesArray = Object.values(unlimitedApps);

  const extraServicesValuesArray = Object.values(extraServices);

  return (
    <Block className={styles.block}>
      <BasicServicesList services={basicServices} />

      <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>{price} руб</li>
      </ul>
      {unlimitedAppsValuesArray.some((value) => value) && (
        <div>
          <h2>dsds</h2>

          <ServiceIconsList
            services={unlimitedApps}
            servicesData={servicesData[0].unlimitedAppsData}
          />
        </div>
      )}
      {extraServicesValuesArray.some((value) => value) && (
        <div>
          <h2>123</h2>
          <ServiceIconsList
            services={extraServices}
            servicesData={servicesData[0].extraServicesData}
          />
        </div>
      )}
    </Block>
  );
};

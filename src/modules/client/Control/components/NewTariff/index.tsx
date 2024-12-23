import React from 'react';

import { BasicServicesList } from '@components/BasicServicesList';
import { ServiceIconsList } from '@components/ServiceIconsList';
import { Block } from '@UI';

import { ServicesDataState, TariffWithImage } from '@entities/model';

import styles from './CartItem.module.scss';

interface CartItemProps extends TariffWithImage {
  servicesData: ServicesDataState[];
}

export const NewTariff: React.FC<CartItemProps> = ({
  unlimitedApps,
  extraServices,
  title,
  price,
  basicServices,
  servicesData,
}) => {
  const unlimitedAppsValuesArray = Object.values(unlimitedApps);
  const extraServicesValuesArray = Object.values(extraServices);

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
    </Block>
  );
};

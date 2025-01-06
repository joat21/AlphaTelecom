import React from 'react';

import { BasicServicesList } from '@components/BasicServicesList';
import { ServiceIconsList } from '@components/ServiceIconsList';
import { Block, Button } from '@UI';

import { ServicesDataState, TariffWithImage } from '@entities/model';

import styles from './NewTariff.module.scss';
import { useGetServicesDataQuery } from '../../../../../services/servicesConfigApi';

interface NewTariffProps extends TariffWithImage {
  servicesData: ServicesDataState;
}

export const NewTariff: React.FC<NewTariffProps> = ({
  unlimitedApps,
  extraServices,
  title,
  price,
  basicServices,
  servicesData,
}) => {
  // const unlimitedAppsValuesArray = Object.values(unlimitedApps);
  // const extraServicesValuesArray = Object.values(extraServices);
  const unlimitedAppsArray = Object.entries(unlimitedApps);
  const unlimitedAppsCount = unlimitedAppsArray.filter((value) => value[1]).length;

  const extraServicesArray = Object.entries(extraServices);

  const extraServicesCount = extraServicesArray.filter((value) => value[1]).length;

  const sorted1 = unlimitedAppsArray.filter((value) => value[1]);
  const sorted2 = extraServicesArray.filter((value) => value[1]);

  return (
    <Block className={styles.block}>
      <h2>{title}</h2>
      <h2>ВКЛЮЧАЕТ В СЕБЯ</h2>
      <Block className={styles.basic}>
        <BasicServicesList className={styles.list} services={basicServices} />
      </Block>
      <h2>БЕЗЛИМИТЫ</h2>

      <Block className={styles.basic}>
        <ul>
          {sorted1.map(([key, value]) => {
            if (unlimitedAppsCount == 0) return 'Нет';

            return (
              <li key={key}>
                <img src={servicesData.unlimitedAppsData[key].imageUrl} />
              </li>
            );
          })}
        </ul>
      </Block>

      <h2>ДОПОЛНИТЕЛЬНО</h2>

      <Block className={styles.basic}>
        <ul>
          {extraServicesArray.map(([key, value]) => {
            if (extraServicesCount == 0) return 'Нет';

            return (
              <li key={key}>
                <img src={servicesData.extraServicesData[key].imageUrl} />
              </li>
            );
          })}
        </ul>
      </Block>

      <Button>ЗА {price} ₽/МЕС.</Button>
    </Block>
  );
};
{
  /* <div className={styles.includes}>
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
      </div> */
}

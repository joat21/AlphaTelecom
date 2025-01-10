import { FC } from 'react';
import { Block } from '@UI';
import { ServicesDataState, TariffWithImage } from '@entities/model';
import styles from './Services.module.scss';

interface ServicesProps {
  tariff: TariffWithImage;
  servicesData: ServicesDataState;
}

export const Services: FC<ServicesProps> = ({ tariff, servicesData }) => {
  const { unlimitedApps, extraServices } = tariff;

  const unlimitedAppsArray = Object.entries(unlimitedApps);
  const unlimitedAppsCount = unlimitedAppsArray.filter((value) => value[1]).length;

  const extraServicesArray = Object.entries(extraServices);
  const extraServicesCount = extraServicesArray.filter((value) => value[1]).length;

  return (
    <Block className={styles.block}>
      <h2>УСЛУГИ</h2>
      <span>{unlimitedAppsCount + extraServicesCount} подключено</span>
      <ul>
        {unlimitedAppsArray.map(([key, value]) => {
          if (!value) return null;
          return (
            <li key={key}>
              <img
                src={servicesData.unlimitedAppsData[key].imageUrl}
                alt={servicesData.unlimitedAppsData[key].label}
              />
            </li>
          );
        })}
        {extraServicesArray.map(([key, value]) => {
          if (!value) return null;
          return (
            <li key={key}>
              <img
                src={servicesData.extraServicesData[key].imageUrl}
                alt={servicesData.extraServicesData[key].label}
              />
            </li>
          );
        })}
      </ul>
    </Block>
  );
};

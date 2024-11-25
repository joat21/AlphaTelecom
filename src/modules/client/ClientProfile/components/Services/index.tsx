import { Block } from '@UI';
import styles from './Services.module.scss';
import { TariffWithImage } from '../../../../../entities/model';
import { FC } from 'react';
import { useGetServicesDataQuery } from '../../../../../services/servicesConfigApi';

interface ServicesProps {
  tariff: TariffWithImage;
}

export const Services: FC<ServicesProps> = ({ tariff }) => {
  const { unlimitedApps, extraServices } = tariff;

  const unlimitedAppsArray = Object.entries(unlimitedApps);
  const unlimitedAppsCount = unlimitedAppsArray.filter(
    (value) => value[1]
  ).length;

  const extraServicesArray = Object.entries(extraServices);
  const extraServicesCount = extraServicesArray.filter(
    (value) => value[1]
  ).length;

  const { data, isLoading } = useGetServicesDataQuery();

  if (!data || isLoading) {
    return 'Загрузка';
  }

  return (
    <Block className={styles.block}>
      <h2>УСЛУГИ</h2>
      <span>{unlimitedAppsCount + extraServicesCount} подключено</span>
      <ul>
        {unlimitedAppsArray.map(([key, value]) => {
          if (!value) return null;
          return (
            <li key={key}>
              <img src={data[0].unlimitedAppsData[key].imageUrl} />
            </li>
          );
        })}
        {extraServicesArray.map(([key, value]) => {
          if (!value) return null;
          return (
            <li key={key}>
              <img src={data[0].extraServicesData[key].imageUrl} />
            </li>
          );
        })}
      </ul>
    </Block>
  );
};

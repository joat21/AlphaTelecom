import { FC } from 'react';
import { ExtraServiceData, UnlimitedAppData } from '@entities/model';
import styles from './ServiceIconsList.module.scss';

interface ServiceIconsListProps {
  services: Record<string, boolean>;
  servicesData: Record<string, UnlimitedAppData | ExtraServiceData>;
}

export const ServiceIconsList: FC<ServiceIconsListProps> = ({
  services,
  servicesData,
}) => {
  const servicesArray = Object.entries(services);

  return (
    <ul className={styles['service-icons-list']}>
      {servicesArray.map(([key, value]) => {
        if (!value) return null;
        return (
          <li key={key}>
            <img src={servicesData[key].imageUrl} alt="" />
          </li>
        );
      })}
    </ul>
  );
};

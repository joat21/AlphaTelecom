import { FC } from 'react';
import styles from './ServiceIconsList.module.scss';
import { ExtraServiceData, UnlimitedAppData } from '../../entities/model';

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
      {servicesArray.map(([key, value], i) => {
        if (!value) return null;
        return (
          <li style={{ zIndex: servicesArray.length - i }} key={key}>
            <img src={servicesData[key].imageUrl} alt="" />
          </li>
        );
      })}
    </ul>
  );
};

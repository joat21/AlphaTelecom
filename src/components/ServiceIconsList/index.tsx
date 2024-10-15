import { FC } from 'react';
import styles from './ServiceIconsList.module.scss';
import { ExtraServices, UnlimitedApps } from '../../entities/model';

interface ServiceIconsListProps {
  services: UnlimitedApps | ExtraServices;
  serviceIcons: Record<string, string>;
}

export const ServiceIconsList: FC<ServiceIconsListProps> = ({
  services,
  serviceIcons,
}) => {
  const servicesArray = Object.entries(services);
  return (
    <ul className={styles['service-icons-list']}>
      {servicesArray.map(([key, value], i) => {
        if (!value) return null;
        return (
          <li style={{ zIndex: servicesArray.length - i }} key={key}>
            <img src={serviceIcons[key]} alt="" />
          </li>
        );
      })}
    </ul>
  );
};

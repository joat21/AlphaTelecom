import { FC } from 'react';
import styles from './ServiceIconsList.module.scss';

interface ServiceIconsListProps {
  servicesArray: [string, boolean][];
  serviceIcons: Record<string, string>;
}

export const ServiceIconsList: FC<ServiceIconsListProps> = ({
  servicesArray,
  serviceIcons,
}) => {
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

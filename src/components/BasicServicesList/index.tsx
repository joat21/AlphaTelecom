import { FC } from 'react';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import styles from './BasicServicesList.module.scss';

interface BasicServicesListProps {
  services: Record<string, number>;
}

export const BasicServicesList: FC<BasicServicesListProps> = ({ services }) => {
  const servicesArray = Object.entries(services);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  if (isLoading || !servicesData) return 'Загрузка...';

  return (
    <ul className={styles['basic-services']}>
      {servicesArray.map(([key, value]) => {
        return (
          <li key={key}>
            {value} {servicesData[0].basicServicesData[key].measureUnit}
          </li>
        );
      })}
    </ul>
  );
};

import { FC } from 'react';
import styles from './BasicServicesList.module.scss';
import { useSelector } from 'react-redux';
import { selectServicesData } from '../../store/servicesData/selectors';

interface BasicServicesListProps {
  services: Record<string, number>;
}

export const BasicServicesList: FC<BasicServicesListProps> = ({ services }) => {
  const servicesArray = Object.entries(services);
  const { basicServices } = useSelector(selectServicesData);

  return (
    <ul className={styles['basic-services']}>
      {basicServices &&
        servicesArray.map(([key, value]) => {
          return (
            <li key={key}>
              {value} {basicServices[key]?.measureUnit}
            </li>
          );
        })}
    </ul>
  );
};

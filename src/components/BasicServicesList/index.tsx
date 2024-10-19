import { FC } from 'react';
import styles from './BasicServicesList.module.scss';
import { useSelector } from 'react-redux';
import { selectMeasureUnits } from '../../store/selectors';

interface BasicServicesListProps {
  services: Record<string, number>;
}

export const BasicServicesList: FC<BasicServicesListProps> = ({ services }) => {
  const servicesArray = Object.entries(services);
  const measureUnits = useSelector(selectMeasureUnits);
  return (
    <ul className={styles['basic-services']}>
      {servicesArray.map(([key, value]) => {
        return (
          <li key={key}>
            {value} {measureUnits[key]}
          </li>
        );
      })}
    </ul>
  );
};

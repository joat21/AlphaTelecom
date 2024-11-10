import { FC } from 'react';
import { Block } from '../../../../UI';
import styles from './BasicServicesList.module.scss';
import { BasicServiceData } from '../../../../entities/model';

interface BasicServicesListProps {
  services: Record<string, number>;
  servicesData: Record<string, BasicServiceData>;
}

export const BasicServicesList: FC<BasicServicesListProps> = ({
  services,
  servicesData,
}) => {
  const servicesArray = Object.entries(services);
  return (
    <ul className={styles.basic}>
      {servicesArray.map(([name, amount]) => {
        const basicServiceData = servicesData[name];
        return (
          <li key={basicServiceData.id}>
            <Block style={{ padding: '28px 60px' }}>
              {amount} {basicServiceData.measureUnit}
            </Block>
          </li>
        );
      })}
    </ul>
  );
};

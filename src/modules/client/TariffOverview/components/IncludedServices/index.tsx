import { FC } from 'react';
import { Block } from '@UI';
import { ServicesDataState } from '@entities/model';
import styles from './IncludedServices.module.scss';

interface IncludedServicesProps {
  services: Record<string, boolean>[];
  servicesData: ServicesDataState;
}

export const IncludedServices: FC<IncludedServicesProps> = ({ services, servicesData }) => {
  const includedServices = services.reduce(
    (result, currentService) => Object.assign(result, currentService),
    {},
  );

  const includedServicesEntriesArray = Object.entries(includedServices);

  const includedServicesData = {
    ...servicesData.unlimitedAppsData,
    ...servicesData.extraServicesData,
  };

  return (
    <div className={styles.root}>
      <h2>Включено в тариф</h2>
      <ul className={styles['included-services']}>
        {includedServicesEntriesArray.map(([name, value]) => {
          if (!value) return null;
          const includedService = includedServicesData[name];
          return (
            <li key={includedService.id}>
              <Block className={styles.item}>
                <span>{includedService.labelForTariffOverview}</span>
                <img src={includedService.imageUrl} alt={includedService.label} />
              </Block>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

import { FC } from 'react';

import { BasicServicesList } from '../BasicServicesList';
import { ServiceIconsList } from '../ServiceIconsList';

import { Tariff } from '@entities/model';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './ServicesList.module.scss';

interface ServicesListProps {
  tariff: Tariff;
  isTitlesVisible: boolean;
}

const ServicesList: FC<ServicesListProps> = ({ tariff, isTitlesVisible }) => {
  const { basicServices, unlimitedApps, extraServices } = tariff;
  const unlimitedAppsValuesArray = Object.values(unlimitedApps);
  const extraServicesValuesArray = Object.values(extraServices);

  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  if (isLoading || !servicesData) return 'Загрузка...';

  return (
    <>
      <BasicServicesList services={basicServices} />
      <div className={styles.lists}>
        {unlimitedAppsValuesArray.some((item) => item) && (
          <div>
            {isTitlesVisible && <span>Безлимит на:</span>}
            <ServiceIconsList
              services={unlimitedApps}
              servicesData={servicesData[0].unlimitedAppsData}
            />
          </div>
        )}
        {extraServicesValuesArray.some((item) => item) && (
          <div>
            {isTitlesVisible && <span>Дополнительно:</span>}
            <ServiceIconsList
              services={extraServices}
              servicesData={servicesData[0].extraServicesData}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ServicesList;

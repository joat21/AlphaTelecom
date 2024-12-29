import { FC } from 'react';

import { BasicServicesList } from '../BasicServicesList';
import { ServiceIconsList } from '../ServiceIconsList';

import { ServicesDataState, Tariff } from '@entities/model';

import styles from './ServicesList.module.scss';

interface ServicesListProps {
  tariff: Tariff;
  isTitlesVisible: boolean;
  servicesData: ServicesDataState;
}

const ServicesList: FC<ServicesListProps> = ({
  tariff,
  isTitlesVisible,
  servicesData,
}) => {
  const { basicServices, unlimitedApps, extraServices } = tariff;
  const unlimitedAppsValuesArray = Object.values(unlimitedApps);
  const extraServicesValuesArray = Object.values(extraServices);

  return (
    <>
      <BasicServicesList services={basicServices} />
      <div className={styles.lists}>
        {unlimitedAppsValuesArray.some((item) => item) && (
          <div>
            {isTitlesVisible && <span>Безлимит на:</span>}
            <ServiceIconsList
              services={unlimitedApps}
              servicesData={servicesData.unlimitedAppsData}
            />
          </div>
        )}
        {extraServicesValuesArray.some((item) => item) && (
          <div>
            {isTitlesVisible && <span>Дополнительно:</span>}
            <ServiceIconsList
              services={extraServices}
              servicesData={servicesData.extraServicesData}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ServicesList;

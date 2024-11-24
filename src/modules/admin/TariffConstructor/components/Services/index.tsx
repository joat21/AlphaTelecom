import { FC } from 'react';
import { BasicServices } from '../BasicServices';
import { UnlimitedTraffic } from '../UnlimitedTraffic';
import { ExtraServices } from '../ExtraServices';

import { ServicesDataState } from '@entities/model';
import { TariffConstructorFormValues } from '../TariffConstructor';

import styles from './Services.module.scss';

interface ServicesProps {
  servicesData: ServicesDataState[];
  initialValues: TariffConstructorFormValues;
}

export const Services: FC<ServicesProps> = ({
  servicesData,
  initialValues,
}) => {
  return (
    <div className={styles.services}>
      <BasicServices
        basicServicesData={servicesData[0].basicServicesData}
        initialValues={initialValues}
      />
      <UnlimitedTraffic
        unlimitedAppsData={servicesData[0].unlimitedAppsData}
        initialValues={initialValues}
      />
      <ExtraServices
        extraServicesData={servicesData[0].extraServicesData}
        initialValues={initialValues}
      />
    </div>
  );
};

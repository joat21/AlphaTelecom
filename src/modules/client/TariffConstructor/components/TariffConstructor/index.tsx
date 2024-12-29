import { FC } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit/react';

import { BasicServices } from '../BasicServices';
import { ExtraServices } from '../ExtraServices';
import { UnlimitedTraffic } from '../UnlimitedTraffic';
import { TariffInfo } from '../TariffInfo';

import {
  useGetConstructorConfigQuery,
  useGetServicesDataQuery,
} from '@services/servicesConfigApi';

import styles from './TariffConstructor.module.scss';

export const TariffConstructor: FC = () => {
  const {
    isLoading: isConstructorConfigLoading,
    isError,
    error,
  } = useGetConstructorConfigQuery();
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  if (isConstructorConfigLoading || !servicesData || isServicesDataLoading)
    return 'Loading...';

  if (isError) {
    console.log(error);
    if ('status' in error) {
      const fetchError = error as FetchBaseQueryError;
      return <div>Error: {fetchError.status}</div>;
    } else {
      const serializedError = error as SerializedError;
      return <div>Error: {serializedError.message}</div>;
    }
  }

  return (
    <div className={styles['tariff-constructor']}>
      <div className={styles.services}>
        <BasicServices servicesData={servicesData[0].basicServicesData} />
        <UnlimitedTraffic servicesData={servicesData[0].unlimitedAppsData} />
        <ExtraServices servicesData={servicesData[0].extraServicesData} />
      </div>
      <div className={styles.info}>
        <TariffInfo servicesData={servicesData[0]} />
      </div>
    </div>
  );
};

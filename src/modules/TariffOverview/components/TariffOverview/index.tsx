import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { BasicServicesList } from '../BasicServicesList';
import { IncludedServices } from '../IncludedServices';
import { Button } from '../../../../UI';

import { useGetServicesDataQuery } from '../../../../services/servicesConfigApi';
import { useGetTariffQuery } from '../../../../services/tariffsApi';

import styles from './TariffOverview.module.scss';
import classNames from 'classnames';

export const TariffOverview: FC = () => {
  const { id = '' } = useParams();
  const { data: servicesData, isLoading: isSerivcesDataLoading } =
    useGetServicesDataQuery();

  const { data: tariff, isLoading } = useGetTariffQuery(id);

  if (isSerivcesDataLoading || !servicesData || isLoading || !tariff)
    return 'Загрузка...';

  const { title, price, basicServices, unlimitedApps, extraServices } = tariff;

  return (
    <div className={styles.root}>
      <h1
        className={styles.title}
        style={{ color: classNames({ 'var(--red)': tariff.id === 5 }) }}
      >
        {title}
      </h1>
      <div className={styles.top}>
        <BasicServicesList
          services={basicServices}
          servicesData={servicesData[0].basicServicesData}
        />
        <Button className={styles.btn} to="/">
          Купить за {price} руб/мес
        </Button>
      </div>
      <div className={styles.bottom}>
        <IncludedServices
          services={[unlimitedApps, extraServices]}
          servicesData={servicesData[0]}
        />
      </div>
    </div>
  );
};

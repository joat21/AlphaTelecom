import { FC } from 'react';

import TariffCard from '../TariffCard';
import ConstructorCard from '../TariffCard/ConstructorCard';

import { useGetTariffsQuery } from '@services/tariffsApi';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './TariffList.module.scss';

export const TariffList: FC = () => {
  const { data: tariffs, isLoading: isTariffsLoading } = useGetTariffsQuery({});
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  if (isTariffsLoading || !tariffs || isServicesDataLoading || !servicesData)
    return 'Загрузка...';

  const filteredTariffs = tariffs.filter((tariff) => tariff.isActive);

  return (
    <ul className={styles.list}>
      {filteredTariffs.map((tariff) => (
        <li key={tariff.id}>
          <TariffCard tariff={tariff} servicesData={servicesData[0]} />
        </li>
      ))}
      <ConstructorCard />
    </ul>
  );
};

import { FC } from 'react';

import TariffCard from '../TariffCard';
import ConstructorCard from '../TariffCard/ConstructorCard';

import { useGetTariffsQuery } from '@services/tariffsApi';

import styles from './TariffList.module.scss';

export const TariffList: FC = () => {
  const { data: tariffs, isLoading } = useGetTariffsQuery({});

  if (isLoading || !tariffs) return 'Загрузка...';

  const filteredTariffs = tariffs.filter((tariff) => tariff.isActive);

  return (
    <ul className={styles.list}>
      {filteredTariffs.map((tariff) => (
        <li key={tariff.id}>
          <TariffCard tariff={tariff} />
        </li>
      ))}
      <ConstructorCard />
    </ul>
  );
};

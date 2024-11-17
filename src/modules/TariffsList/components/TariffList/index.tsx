import { FC } from 'react';

import TariffCard from '../TariffCard';
import ConstructorCard from '../TariffCard/ConstructorCard';

import { useGetTariffsQuery } from '../../../../services/tariffsApi';

import styles from './TariffList.module.scss';

export const TariffList: FC = () => {
  const { data: tariffs, isLoading } = useGetTariffsQuery();

  if (isLoading) return 'Загрузка...';

  return (
    <ul className={styles.list}>
      {tariffs &&
        tariffs.map((tariff) => (
          <li key={tariff.id}>
            <TariffCard tariff={tariff} />
          </li>
        ))}
      <ConstructorCard />
    </ul>
  );
};

import { FC } from 'react';
import TariffCard from '../TariffCard';
import styles from './TariffList.module.scss';
import { useGetTariffsQuery } from '../../../../services/tariffsApi';

export const TariffList: FC = () => {
  const { data: tariffs, isLoading } = useGetTariffsQuery();

  if (isLoading) return 'Загрузка...';

  return (
    <ul className={styles.list}>
      {tariffs &&
        tariffs.map((tariff) => (
          <li key={tariff.id}>
            <TariffCard {...tariff} />
          </li>
        ))}
    </ul>
  );
};

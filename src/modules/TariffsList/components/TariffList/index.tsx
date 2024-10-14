import { FC, useEffect, useState } from 'react';
import TariffCard from '../TariffCard';
import styles from './TariffList.module.scss';
import { fetchTariffs } from '../../api/fetchTariffs';

type Tariff = {
  id: number;
  title: string;
  imageUrl: string;
  basic: {
    internet: number;
    minutes: number;
    sms: number;
  };
  noLimits: {
    noLimitSocial: boolean;
    noLimitVideo: boolean;
    noLimitMusic: boolean;
  };
  extra: {
    intercityCalls: boolean;
  };
  price?: number;
};

export const TariffList: FC = () => {
  const [items, setItems] = useState<Tariff[]>();

  useEffect(() => {
    fetchTariffs().then((data) => setItems(data));
  }, []);

  return (
    <ul className={styles.list}>
      {items &&
        items.map((item) => (
          <li key={item.id}>
            <TariffCard {...item} />
          </li>
        ))}
    </ul>
  );
};

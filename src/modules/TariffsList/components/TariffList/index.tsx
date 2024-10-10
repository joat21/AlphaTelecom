import { FC, useEffect, useState } from 'react';
import TariffCard from '../../../../components/TariffCard';
import styles from './TariffList.module.scss';
import { fetchTariffs } from '../../api/fetchTariffs';

type Services = {
  internet: number;
  minutes: number;
  sms: number;
};

type Tariff = {
  id: number;
  title: string;
  imageUrl: string;
  services?: Services;
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

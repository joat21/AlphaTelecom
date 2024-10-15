import { FC, useEffect, useState } from 'react';
import TariffCard from '../TariffCard';
import styles from './TariffList.module.scss';
import { fetchTariffs } from '../../api/fetchTariffs';
import { TariffWithImage } from '../../../../entities/model';

export const TariffList: FC = () => {
  const [items, setItems] = useState<TariffWithImage[]>();

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

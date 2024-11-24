import { CartItem } from '../CartItem';
import { useSelector } from 'react-redux';

import { Contacts } from '../Contacts';

import styles from './Cart.module.scss';
import { useGetServicesDataQuery } from '../../../../services/servicesConfigApi';
import { selectCart } from '../../store/selectors';

export const Cart = () => {
  const { items } = useSelector(selectCart);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  if (!servicesData || isLoading) {
    return 'Загрузка';
  }

  return (
    <div className={styles.block}>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <CartItem {...item} servicesData={servicesData} />
          </li>
        ))}
      </ul>
      <Contacts />
    </div>
  );
};

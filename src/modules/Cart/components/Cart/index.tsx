import { CartItem } from '../CartItem';
import { useSelector } from 'react-redux';
import { CartEmpty } from '../CartEmpty';
import { TotalSum } from '../TotalSum';

import styles from './Cart.module.scss';
import { useGetServicesDataQuery } from '../../../../services/servicesConfigApi';
import { selectCart } from '../../store/selectors';
import { Block } from '../../../../UI';

export const Cart = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  if (!servicesData || isLoading) {
    return 'Загрузка';
  }

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <Block className={styles.block}>
      <ul className={styles['cart-items']}>
        {items.map((item, i) => (
          <li key={i}>
            <CartItem {...item} servicesData={servicesData} />
          </li>
        ))}
      </ul>

      <TotalSum />
    </Block>
  );
};

import { CartItem } from '../CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll } from '../../store/slice';
import styles from './Cart.module.scss';
import { selectCart } from '../../store/selectors';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { Block, Button } from '@UI';
import { TotalSum } from '../TotalSum';
import { CartEmpty } from '../CartEmpty';

export const Cart = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();
  const dispatch = useDispatch();
  const onClickDeleteAll = () => {
    dispatch(deleteAll());
  };
  //console.log(items);
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
            <CartItem {...item} servicesData={servicesData} index={i} />
          </li>
        ))}
        <Button onClick={onClickDeleteAll} />
      </ul>

      <TotalSum />
    </Block>
  );
};

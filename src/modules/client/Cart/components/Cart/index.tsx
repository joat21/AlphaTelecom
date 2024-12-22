import { useDispatch, useSelector } from 'react-redux';

import { Block, Button } from '@UI';
import { CartItem } from '../CartItem';
import { TotalSum } from '../TotalSum';
import { CartEmpty } from '../CartEmpty';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { useGetCartQuery } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';
import { deleteAll } from '../../store/slice';

import styles from './Cart.module.scss';

export const Cart = () => {
  const dispatch = useDispatch();
  const { activeUserId, guestId } = useSelector(selectAuth);
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  const userId = activeUserId ?? guestId;
  const { data: items, isLoading: isItemsLoading } = useGetCartQuery(userId!);

  if (!servicesData || isServicesDataLoading || !items || isItemsLoading) {
    return 'Загрузка';
  }

  if (!items.length) {
    return <CartEmpty />;
  }

  const totalPrice = items.reduce(
    (currentPrice, currentItem) => currentPrice + currentItem.price,
    0
  );

  const onClickDeleteAll = () => {
    dispatch(deleteAll());
  };

  return (
    <Block className={styles.block}>
      <ul className={styles['cart-items']}>
        {items.map((item, i) => (
          <li key={i}>
            <CartItem {...item} servicesData={servicesData} index={i} />
          </li>
        ))}
      </ul>
      <div className={styles.div}>
        <TotalSum totalPrice={totalPrice} />
        <Button className={styles.btn} onClick={onClickDeleteAll}>
          Очистить
        </Button>
      </div>
    </Block>
  );
};

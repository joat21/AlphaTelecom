import { useSelector } from 'react-redux';

import { Block, Button } from '@UI';
import { CartItem } from '../CartItem';
import { TotalSum } from '../TotalSum';
import { CartEmpty } from '../CartEmpty';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { useGetCartQuery, useRemoveItemMutation } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './Cart.module.scss';

export const Cart = () => {
  const { activeUserId, guestId } = useSelector(selectAuth);
  const [removeItem] = useRemoveItemMutation();
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

  const onClickDeleteAll = async () => {
    // не могу на фейк апи отправить запрос на удаление всех товаров
    // а при использовании await Promise.all что то багает и один из товаров не удаляется
    // поэтому запросы поочередно отправляю, это работает корректно
    for (const item of items) {
      await removeItem(item.cartId).unwrap();
    }

    // await Promise.all(
    //   items.map((item) => removeItem(item.cartId).unwrap())
    // );
  };

  return (
    <Block className={styles.block}>
      <ul className={styles['cart-items']}>
        {items.map((item, i) => (
          <li key={i}>
            <CartItem {...item} servicesData={servicesData} />
          </li>
        ))}
      </ul>
      <div className={styles.div}>
        <TotalSum totalPrice={totalPrice} />
        <Button
          className={styles.btn}
          onClick={onClickDeleteAll}
          variant="alternative"
        >
          Очистить
        </Button>
      </div>
    </Block>
  );
};

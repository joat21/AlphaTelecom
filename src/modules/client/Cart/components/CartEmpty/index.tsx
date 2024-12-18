import styles from './CartEmpty.module.scss';
import cartEmpty from '@assets/img/cart/cart-empty.svg';
import { Button } from '@UI';

export const CartEmpty = () => {
  return (
    <div className={styles.div}>
      <img width="460" height="430" src={cartEmpty} alt="Корзина пустая"></img>
      <p>В корзине ничего нет</p>
      <Button className={styles.btn} to={'/tariffs'}>
        Перейти к тарифам
      </Button>
    </div>
  );
};

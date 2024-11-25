<<<<<<<< HEAD:src/modules/client/Cart/store/utils/getCartFromLS.ts
import { TariffWithImage } from '@entities/model';
========
import { TariffWithImage } from '../../../../entities/model';
>>>>>>>> 119fbb6d354b77d56bf5325142acde9c615a58c3:src/modules/Cart/store/utils/getCartFromLS.ts
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('persist:root');
  const items = data ? JSON.parse(JSON.parse(data).items) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as TariffWithImage[],
    totalPrice,
  };
};

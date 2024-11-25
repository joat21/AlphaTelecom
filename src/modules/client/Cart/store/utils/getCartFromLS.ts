import { TariffWithImage } from '@entities/model';
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

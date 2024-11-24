import { TariffWithImage } from '../../../../entities/model';

export const calcTotalPrice = (items: TariffWithImage[]) => {
  return items.reduce((sum, obj) => obj.price + sum, 0);
};

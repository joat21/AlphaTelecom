import { Remainder } from '@entities/model';
import { PriceList } from '@services/servicesConfigApi';

export const getDiscount = (
  remainsData: Remainder,
  priceList: PriceList,
  newTariffPrice: number
): { discount: number; discountPercentage: number } => {
  let discountPercentage = 0;

  const discount =
    remainsData.internet *
      (priceList.basicServices.internet.price /
        priceList.basicServices.internet.amount) +
    remainsData.minutes *
      (priceList.basicServices.minutes.price /
        priceList.basicServices.minutes.amount) +
    remainsData.sms *
      (priceList.basicServices.sms.price / priceList.basicServices.sms.amount);

  if (discount > newTariffPrice / 2) {
    return { discount: newTariffPrice / 2, discountPercentage: 50 };
  }

  discountPercentage = Math.round((discount / newTariffPrice) * 100);

  return {
    discount: Math.round(discount),
    discountPercentage,
  };
};

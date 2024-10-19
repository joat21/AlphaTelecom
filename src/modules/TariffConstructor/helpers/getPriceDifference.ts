import { Service } from '../../../entities/model';

export const getPriceDifference = (
  newValue: number | boolean,
  service: Service,
  value?: number
): number => {
  if (typeof newValue === 'boolean') {
    return newValue ? service.price : -service.price;
  }

  if (
    typeof value === 'number' &&
    typeof newValue === 'number' &&
    service.amount
  ) {
    const amountDifference = newValue - value;
    return (amountDifference / service.amount) * service.price;
  }

  return 0;
};

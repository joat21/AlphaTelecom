import { ConfigBasicService, ConfigService } from '@entities/model';

export const getPriceDifference = (
  newValue: number | boolean,
  configService: ConfigService | ConfigBasicService,
  value?: number
): number => {
  if (typeof newValue === 'boolean') {
    return newValue ? configService.price : -configService.price;
  }

  if (value !== undefined && 'amount' in configService) {
    const amountDifference = newValue - value;
    return (amountDifference / configService.amount) * configService.price;
  }

  return 0;
};

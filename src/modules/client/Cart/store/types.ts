import { TariffWithImage } from '@entities/model';

export interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: TariffWithImage[];
}

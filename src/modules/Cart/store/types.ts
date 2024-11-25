import { TariffWithImage } from '../../../entities/model';

export interface CartSliceState {
  totalPrice: number;
  items: TariffWithImage[];
}

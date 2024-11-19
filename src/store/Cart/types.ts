export type CartItem = {
  id: string;
  title: string;
  price: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

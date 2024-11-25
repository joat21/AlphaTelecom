import { FC } from 'react';
import { Cart } from '@modules/client/Cart';
import { Container, PageTitle } from '@UI';

export const CartPage: FC = () => {
  return (
    <>
      <PageTitle>Корзина</PageTitle>
      <Container>
        <Cart />
      </Container>
    </>
  );
};

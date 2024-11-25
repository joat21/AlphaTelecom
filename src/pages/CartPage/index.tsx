import { FC } from 'react';
import { Container, PageTitle } from '../../UI';
import { Cart } from '../../modules/Cart';

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

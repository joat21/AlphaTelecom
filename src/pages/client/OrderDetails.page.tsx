import { FC } from 'react';
import { Container, PageTitle } from '@UI';
import { OrderDetails } from '@modules/client/OrderDetails';

export const OrderDetailsPage: FC = () => {
  return (
    <>
      <PageTitle>Оформление покупки</PageTitle>
      <Container>
        <OrderDetails />
      </Container>
    </>
  );
};

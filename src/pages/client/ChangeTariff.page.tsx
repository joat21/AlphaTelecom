import { FC } from 'react';
import { ChangeTariff } from '@modules/client/ChangeTariff';
import { Container } from '@UI';
import { PageTitle } from '@UI';

export const ChangeTariffPage: FC = () => {
  return (
    <>
      <PageTitle>СМЕНА ТАРИФА</PageTitle>
      <Container>
        <ChangeTariff />
      </Container>
    </>
  );
};

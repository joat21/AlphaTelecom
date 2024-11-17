import { FC } from 'react';
import { TariffList } from '@modules/client/TariffsList';
import { Container, PageTitle } from '@UI';

export const TariffsListPage: FC = () => {
  return (
    <>
      <PageTitle>Тарифы</PageTitle>
      <Container>
        <TariffList />
      </Container>
    </>
  );
};

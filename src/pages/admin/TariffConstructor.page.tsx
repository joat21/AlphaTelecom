import { FC } from 'react';
import { TariffConstructor } from '@modules/admin/TariffConstructor';
import { Container, PageTitle } from '@UI';

export const TariffConstructorPage: FC = () => {
  return (
    <>
      <PageTitle>Конструктор Тарифа</PageTitle>
      <Container>
        <TariffConstructor />
      </Container>
    </>
  );
};

import { FC } from 'react';
import { TariffConstructor } from '@modules/client/TariffConstructor';
import { Container, PageTitle } from '@UI';

export const TariffConstructorPage: FC = () => {
  return (
    <>
      <PageTitle>Конструктор тарифа</PageTitle>
      <Container>
        <TariffConstructor />
      </Container>
    </>
  );
};

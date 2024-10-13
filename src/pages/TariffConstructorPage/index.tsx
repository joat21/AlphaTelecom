import { FC } from 'react';
import { Container, PageTitle } from '../../UI';
import { TariffConstructor } from '../../modules/TariffConstructor';

const TariffConstructorPage: FC = () => {
  return (
    <>
      <PageTitle>Конструктор тарифа</PageTitle>
      <Container>
        <TariffConstructor />
      </Container>
    </>
  );
};

export default TariffConstructorPage;

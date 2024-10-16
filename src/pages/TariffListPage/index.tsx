import { FC } from 'react';
import { Container, PageTitle } from '../../UI';
import { TariffList } from '../../modules/TariffsList';

const TariffsPage: FC = () => {
  return (
    <>
      <PageTitle>Тарифы</PageTitle>
      <Container>
        <TariffList />
      </Container>
    </>
  );
};

export default TariffsPage;

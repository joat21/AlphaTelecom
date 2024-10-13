import { FC } from 'react';
import { PageTitle } from '../../UI';
import { TariffConstructor } from '../../modules/TariffConstructor';

const TariffConstructorPage: FC = () => {
  return (
    <>
      <PageTitle>Конструктор тарифа</PageTitle>
      <TariffConstructor />
    </>
  );
};

export default TariffConstructorPage;

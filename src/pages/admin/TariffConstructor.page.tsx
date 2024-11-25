import { FC } from 'react';
import { TariffConstructor } from '@modules/admin/TariffConstructor';
import { Container } from '@UI';

export const TariffConstructorPage: FC = () => {
  return (
    <Container>
      <TariffConstructor />
    </Container>
  );
};

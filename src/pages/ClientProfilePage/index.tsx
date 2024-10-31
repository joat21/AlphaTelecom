import { FC } from 'react';
import { Container } from '../../UI';
import { ClientProfile } from '../../modules/ClientProfile';

export const ClientProfilePage: FC = () => {
  return (
    <Container>
      <ClientProfile />
    </Container>
  );
};

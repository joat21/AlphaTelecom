import { FC } from 'react';
import { Container } from '../../UI';
import { Info } from '../../modules/ClientProfile';
import { ClientsList } from '../../modules/ClientProfile/components/ClientsList';

export const ClientProfilePage: FC = () => {
  return (
    <>
      <ClientsList />
      <Container>
        <Info />
      </Container>
    </>
  );
};

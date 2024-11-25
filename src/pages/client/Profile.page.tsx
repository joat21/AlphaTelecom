import { FC } from 'react';
import { Info } from '@modules/client/ClientProfile';
import { ClientsList } from '@modules/client/ClientProfile/components/ClientsList';
import { Container } from '../../UI';

export const ProfilePage: FC = () => {
  return (
    <>
      <ClientsList />
      <Container>
        <Info />
      </Container>
    </>
  );
};

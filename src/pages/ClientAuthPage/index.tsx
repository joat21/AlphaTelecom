import { FC } from 'react';
import { Container } from '../../UI';
import ClientAuth from '../../modules/ClientAuth';

const ClientAuthPage: FC = () => {
  return (
    <>
      <Container>
        <ClientAuth />
      </Container>
    </>
  );
};

export default ClientAuthPage;

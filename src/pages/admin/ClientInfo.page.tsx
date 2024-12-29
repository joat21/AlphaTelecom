import { FC } from 'react';
import { ClientInfo } from '@modules/admin/ClientInfo';
import { Block, Container, PageTitle } from '@UI';

export const ClientInfoPage: FC = () => {
  return (
    <>
      <Block
        style={{
          marginBottom: 35,
          width: '100%',
          height: 100,
          borderRadius: 0,
        }}
      />
      <Container>
        <ClientInfo />
      </Container>
    </>
  );
};

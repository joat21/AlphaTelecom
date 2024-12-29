import { FC } from 'react';
import { Container } from '@UI';
import { Auth } from '@modules/client/Auth';

export const AuthPage: FC = () => {
  return (
    <Container>
      <Auth />
    </Container>
  );
};

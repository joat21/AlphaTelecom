import { FC } from 'react';
import Auth from '@modules/admin/Auth';
import { Container } from '@UI';

export const AuthPage: FC = () => {
  return (
    <Container>
      <Auth />
    </Container>
  );
};

import { FC } from 'react';
import { Profile } from '@modules/client/ClientProfile';
import { Container } from '@UI';
import { AccountsMenu } from '@modules/client/ClientProfile/components/AccountsMenu';

export const ProfilePage: FC = () => {
  return (
    <>
      <AccountsMenu />
      <Container>
        <Profile />
      </Container>
    </>
  );
};

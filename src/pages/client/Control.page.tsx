import { FC } from 'react';
import { Control } from '@modules/client/Control';
import { Container, PageTitle } from '@UI';

export const ControlPage: FC = () => {
  return (
    <>
      <Container>
        <Control />
      </Container>
    </>
  );
};

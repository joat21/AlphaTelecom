import { FC } from 'react';
import { TariffOverview } from '@modules/client/TariffOverview';
import { Block, Container } from '@UI';

export const TariffPage: FC = () => {
  return (
    <>
      <Block
        style={{
          marginBottom: 45,
          width: '100%',
          height: 120,
          borderRadius: 0,
        }}
      />
      <Container>
        <TariffOverview />
      </Container>
    </>
  );
};

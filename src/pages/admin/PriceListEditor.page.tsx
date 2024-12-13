import { FC } from 'react';
import { PriceListEditor } from '@modules/admin/PriceListEditor';
import { Container, PageTitle } from '@UI';

export const PriceListEditorPage: FC = () => {
  return (
    <>
      <PageTitle>Прайс-лист</PageTitle>
      <Container>
        <PriceListEditor />
      </Container>
    </>
  );
};

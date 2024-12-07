import { FC } from 'react';
import { PriceListEditor } from '@modules/admin/PriceListEditor';
import { Container, PageTitle } from '@UI';

export const PriceListEditorPage: FC = () => {
  return (
    <>
      <PageTitle>Редактор прайс-листа</PageTitle>
      <Container>
        <PriceListEditor />
      </Container>
    </>
  );
};

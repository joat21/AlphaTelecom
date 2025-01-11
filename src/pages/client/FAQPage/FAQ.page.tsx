import { FC } from 'react';
import { FAQ } from '@modules/client/FAQ';
import { Container, PageTitle } from '@UI';
import styles from './FAQPage.module.scss';

export const FAQPage: FC = () => {
  return (
    <>
      <PageTitle style={{ margin: 0 }}>Часто задаваемые вопросы</PageTitle>
      <Container className={styles.container}>
        <FAQ />
      </Container>
    </>
  );
};

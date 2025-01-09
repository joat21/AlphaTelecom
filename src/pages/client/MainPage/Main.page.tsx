import { FC } from 'react';
import { Main } from '@modules/client/Main';
import { Container, PageTitle } from '@UI';
import styles from './MainPage.module.scss';

export const MainPage: FC = () => {
  return (
    <>
      <PageTitle style={{ margin: 0 }}>Главная</PageTitle>
      <Container className={styles.container}>
        <Main />
      </Container>
    </>
  );
};

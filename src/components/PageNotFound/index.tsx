import { FC } from 'react';
import pageNotFound from '@assets/img/page-not-found/page-not-found.png';
import { Button } from '@UI';
import styles from './PageNotFound.module.scss';

export const PageNotFound: FC = () => {
  return (
    <div className={styles.block}>
      <img src={pageNotFound} alt="Page not found" />
      <span>Упс! Что-то пошло не так, этой страницы не существует</span>
      <Button className={styles.btn} to={'/'}>
        Вернуться на главную
      </Button>
    </div>
  );
};

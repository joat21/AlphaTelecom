import { FC } from 'react';
import email from '@assets/img/footer/email.svg';
import styles from './Footer.module.scss';
import { Block, Container } from '@UI';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Block className={styles['white-line']}></Block>
      <Container className={styles.block}>
        <p className={styles['cookies-text']}>
          Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookie в
          соответствии с Политикой Компаний в области использования файлов cookie, использование
          рекомендательных технологий, а также соглашаетесь с Политикой обработки и защиты
          персональных данных и Правилами пользования личным кабинетом
        </p>

        <a href="mailto:pargeliy01@gmail.com">
          <img src={email} alt="Почта" />
        </a>
      </Container>
    </footer>
  );
};

import { FC } from 'react';
import email from '@assets/img/footer/email.svg';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <>
      <footer className={styles.footer}></footer>
      <div className={styles.block}>
        <div className={styles['cookies-text']}>
          <span>
            Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookie в
            соответствии с Политикой Компаний в области использования файлов cookie, использование
            рекомендательных технологий, а также соглашаетесь с Политикой обработки и защиты
            персональных данных и Правилами пользования личным кабинетом
          </span>
        </div>

        <Link to="https://mail.ru/">
          <img src={email} alt="Почта" />
        </Link>
      </div>
    </>
  );
};

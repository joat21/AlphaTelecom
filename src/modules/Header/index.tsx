import { Link } from 'react-router-dom';

import alphaLogo from '../../assets/img/header/alpha-logo.svg';
import profileLogo from '../../assets/img/header/profile-logo.svg';

import { ROUTES } from '../../constants/routes';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <Link to="/123" className={styles.logo}>
          <img src={alphaLogo} alt="logo" />
        </Link>
        <nav>
          <ul className={styles['nav-list']}>
            <li className={styles['nav-link']}>
              <Link to={ROUTES.PUBLIC.HOME}>Главная</Link>
            </li>
            <li className={styles['nav-link']}>
              <Link to={ROUTES.PUBLIC.TARIFFS}>Тарифы</Link>
            </li>
            <li className={styles['nav-link']}>
              <Link to={ROUTES.PUBLIC.FAQ}>Вопросы</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link to={ROUTES.CLIENT.PROFILE} className={styles.header__profile}>
        <img src={profileLogo} alt="logo" />
      </Link>
    </header>
  );
};
export default Header;

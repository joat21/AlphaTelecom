import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import alphaLogo from '../../assets/img/header/alpha-logo.svg';
import profileLogo from '../../assets/img/header/profile-logo.svg';

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
              <Link to="">Главная</Link>
            </li>
            <li className={styles['nav-link']}>
              <Link to="/tariffs">Тарифы</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Link to="/profile" className={styles.header__profile}>
        <img src={profileLogo} alt="logo" />
      </Link>
    </header>
  );
};
export default Header;

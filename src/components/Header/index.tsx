import { Link, NavLink, To } from 'react-router-dom';
import classNames from 'classnames';

import alphaLogo from '@assets/img/header/alpha-logo.svg';
import profileLogo from '@assets/img/header/profile-logo.svg';

import { ROUTES } from '@constants/routes';

import styles from './Header.module.scss';
import { FC } from 'react';
import { UserRole } from '@entities/model';

interface NavLink {
  label: string;
  to: To;
}

interface HeaderProps {
  userRole: UserRole;
}

const links = {
  client: {
    navLinks: [
      { label: 'Главная', to: ROUTES.PUBLIC.HOME },
      { label: 'Тарифы', to: ROUTES.PUBLIC.TARIFFS },
      { label: 'Вопросы', to: ROUTES.PUBLIC.FAQ },
    ],
    profileLink: ROUTES.CLIENT.PROFILE,
  },
  admin: {
    navLinks: [
      { label: 'Тарифы', to: ROUTES.ADMIN.TARIFFS },
      { label: 'Клиенты', to: ROUTES.ADMIN.CLIENTS },
    ],
    profileLink: ROUTES.ADMIN.HOME,
  },
};

export const Header: FC<HeaderProps> = ({ userRole }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <img src={alphaLogo} alt="logo" className={styles.logo} />
        <nav>
          <ul className={styles['nav-list']}>
            {links[userRole].navLinks.map((navLink) => (
              <li key={navLink.to}>
                <NavLink
                  to={navLink.to}
                  className={({ isActive }) =>
                    classNames(styles['nav-link'], {
                      [styles.active]: isActive,
                    })
                  }
                >
                  {navLink.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Link to={links[userRole].profileLink} className={styles.header__profile}>
        <img src={profileLogo} alt="Профиль" />
      </Link>
    </header>
  );
};

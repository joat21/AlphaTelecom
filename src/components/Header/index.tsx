import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import alphaLogo from '@assets/img/header/alpha-logo.svg';

import { UserRole } from '@entities/model';
import { ROUTES } from '@constants/routes';

import styles from './Header.module.scss';

type HeaderProps =
  | { userRole: UserRole.CLIENT; cartTotalCount: number }
  | { userRole: UserRole.ADMIN; cartTotalCount?: never };

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
      { label: 'Прайс-лист', to: ROUTES.ADMIN.PRICE_LIST },
    ],
    profileLink: ROUTES.ADMIN.HOME,
  },
};

export const Header: FC<HeaderProps> = ({ userRole, cartTotalCount }) => {
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

      {userRole === UserRole.CLIENT && (
        <Link to="/cart" className={classNames(styles.header__cart, styles.icon)}>
          {/* <img width="55" height="55" src={cartLogo} alt="Корзина" /> */}
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={styles['cart-icon']}
          >
            <path
              d="M40.3946 30.7252C42.4393 30.7252 44.2387 29.6074 45.1656 27.9171L54.9256 10.2237C55.9343 8.42438 54.6257 6.18885 52.5537 6.18885H12.2051L9.64241 0.736328H0.727539V6.18885H6.18006L15.9946 26.8812L12.3141 33.5332C10.324 37.1864 12.9412 41.6302 17.0851 41.6302H49.8002V36.1777H17.0851L20.084 30.7252H40.3946ZM14.795 11.6414H47.9191L40.3946 25.2727H21.2563L14.795 11.6414ZM17.0851 44.3565C14.0862 44.3565 11.6598 46.8101 11.6598 49.809C11.6598 52.8079 14.0862 55.2615 17.0851 55.2615C20.084 55.2615 22.5376 52.8079 22.5376 49.809C22.5376 46.8101 20.084 44.3565 17.0851 44.3565ZM44.3477 44.3565C41.3488 44.3565 38.9224 46.8101 38.9224 49.809C38.9224 52.8079 41.3488 55.2615 44.3477 55.2615C47.3466 55.2615 49.8002 52.8079 49.8002 49.809C49.8002 46.8101 47.3466 44.3565 44.3477 44.3565Z"
              fill="currentColor"
            />
          </svg>

          {cartTotalCount > 0 && <span>{cartTotalCount}</span>}
        </Link>
      )}

      <Link to={links[userRole].profileLink} className={styles.icon}>
        {/* <img src={profileLogo} alt="Профиль" /> */}
        <svg
          width="60"
          height="61"
          viewBox="0 0 60 61"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={styles['profile-icon']}
        >
          <path
            d="M30 0C24.1704 0.0110761 18.4697 1.71719 13.5925 4.91054C8.7153 8.10389 4.87196 12.6466 2.53065 17.9855C0.189337 23.3243 -0.548896 29.2288 0.405868 34.9797C1.36063 40.7306 3.96719 46.0798 7.90804 50.3757C10.7227 53.4266 14.1387 55.8615 17.9409 57.5269C21.7431 59.1923 25.8491 60.0521 30 60.0521C34.1509 60.0521 38.2569 59.1923 42.0591 57.5269C45.8613 55.8615 49.2774 53.4266 52.092 50.3757C56.0328 46.0798 58.6394 40.7306 59.5941 34.9797C60.5489 29.2288 59.8107 23.3243 57.4694 17.9855C55.128 12.6466 51.2847 8.10389 46.4075 4.91054C41.5303 1.71719 35.8296 0.0110761 30 0ZM30 54.1028C23.7736 54.0933 17.7936 51.669 13.3183 47.3399C14.677 44.0322 16.9884 41.2032 19.9587 39.2121C22.929 37.2211 26.4241 36.1581 30 36.1581C33.5759 36.1581 37.071 37.2211 40.0413 39.2121C43.0116 41.2032 45.323 44.0322 46.6817 47.3399C42.2064 51.669 36.2264 54.0933 30 54.1028ZM23.9886 24.0457C23.9886 22.8567 24.3411 21.6945 25.0017 20.7059C25.6622 19.7173 26.6011 18.9468 27.6995 18.4918C28.798 18.0369 30.0067 17.9178 31.1728 18.1498C32.3389 18.3817 33.41 18.9542 34.2507 19.795C35.0914 20.6357 35.664 21.7068 35.8959 22.8729C36.1279 24.039 36.0088 25.2477 35.5538 26.3461C35.0988 27.4446 34.3283 28.3834 33.3398 29.044C32.3512 29.7045 31.1889 30.0571 30 30.0571C28.4057 30.0571 26.8766 29.4237 25.7493 28.2964C24.6219 27.169 23.9886 25.64 23.9886 24.0457ZM50.7695 42.0799C48.0839 37.4865 43.9507 33.9135 39.0171 31.9206C40.5475 30.1853 41.5447 28.0452 41.889 25.7572C42.2333 23.4692 41.91 21.1305 40.9581 19.0216C40.0061 16.9128 38.4658 15.1234 36.5221 13.8682C34.5784 12.6131 32.3138 11.9454 30 11.9454C27.6862 11.9454 25.4216 12.6131 23.4779 13.8682C21.5342 15.1234 19.9939 16.9128 19.0419 19.0216C18.09 21.1305 17.7667 23.4692 18.111 25.7572C18.4553 28.0452 19.4525 30.1853 20.9829 31.9206C16.0493 33.9135 11.9161 37.4865 9.23055 42.0799C7.09032 38.4343 5.9595 34.2845 5.95433 30.0571C5.95433 23.6798 8.48771 17.5637 12.9971 13.0542C17.5066 8.5448 23.6227 6.01142 30 6.01142C36.3773 6.01142 42.4934 8.5448 47.0029 13.0542C51.5123 17.5637 54.0457 23.6798 54.0457 30.0571C54.0405 34.2845 52.9097 38.4343 50.7695 42.0799Z"
            fill="currentColor"
          />
        </svg>
      </Link>
    </header>
  );
};

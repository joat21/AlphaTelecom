import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import alphaLogo from '@assets/img/header/alpha-logo.svg';
import profileLogo from '@assets/img/header/profile-logo.svg';
import cartLogo from '@assets/img/header/cart.svg';

import { UserRole } from '@entities/model';
import { ROUTES } from '@constants/routes';
import { useLazyGetCartQuery } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './Header.module.scss';

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
      { label: 'Прайс-лист', to: ROUTES.ADMIN.PRICE_LIST },
    ],
    profileLink: ROUTES.ADMIN.HOME,
  },
};

export const Header: FC<HeaderProps> = ({ userRole }) => {
  const [totalCount, setTotalCount] = useState(0);
  const { activeUserId, guestId } = useSelector(selectAuth);
  const [getCart] = useLazyGetCartQuery();

  useEffect(() => {
    if (userRole !== UserRole.CLIENT) return;

    const getClientCartItemsCount = async () => {
      const id = activeUserId ?? guestId;
      const cart = await getCart(id!).unwrap();
      setTotalCount(cart.length);
    };

    getClientCartItemsCount();
  }, [activeUserId, guestId, userRole, getCart]);

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
        <Link to="/cart" className={styles.header__cart}>
          <img width="80" height="80" src={cartLogo} alt="Корзина" />
          <span>{totalCount}</span>
        </Link>
      )}

      <Link to={links[userRole].profileLink} className={styles.header__profile}>
        <img src={profileLogo} alt="Профиль" />
      </Link>
    </header>
  );
};

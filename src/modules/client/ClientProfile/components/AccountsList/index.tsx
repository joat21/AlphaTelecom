import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

import { Block } from '@UI';

import { useLazyFetchUserByTokenQuery, User } from '@services/authApi';
import { changeActiveUserId, removeToken } from '@store/Auth/slice';
import { selectAuth } from '@store/Auth/selectors';

import styles from './AccountsList.module.scss';
import classNames from 'classnames';

export const AccountsList = () => {
  const dispatch = useDispatch();
  const { activeUserId, tokens } = useSelector(selectAuth);
  const [userProfiles, setUserProfiles] = useState<User[]>();
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();

  useEffect(() => {
    const fetchProfiles = async () => {
      const promises = Object.values(tokens).map((token) => {
        // снова из за бага апи беру данные не из ответа, а из токена
        fetchUserByToken(token).unwrap();

        return jwtDecode<User>(token);
      });

      const userProfiles = await Promise.all(promises);
      setUserProfiles(userProfiles);
    };

    fetchProfiles();
  }, [tokens, fetchUserByToken]);

  const onChangeAccount = (id: number) => {
    dispatch(changeActiveUserId(id));
  };

  const onLogout = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ) => {
    {
      e.stopPropagation();
      dispatch(removeToken(id));
    }
  };

  return (
    <ul className={styles['accounts-list']}>
      {userProfiles &&
        userProfiles.map((user) => (
          <li
            key={user.id}
            className={styles.client}
            onClick={() => onChangeAccount(user.id)}
          >
            <Block
              className={classNames(styles.block, {
                [styles.active]: activeUserId === user.id,
              })}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.avatar}
              >
                <circle cx="40" cy="40" r="40" />
              </svg>
              <div>
                <span>
                  {user.name} {user.surname}
                </span>
                <span>{user.phone}</span>
              </div>
              <svg
                viewBox="0 0 36 32"
                xmlns="http://www.w3.org/2000/svg"
                onClick={(e) => onLogout(e, user.id)}
                className={styles['logout-icon']}
              >
                <defs>
                  <style>
                    {`.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}`}
                  </style>
                </defs>
                <title />
                <g id="logout">
                  <line
                    className={classNames('cls-1', [styles['logout-arrow']])}
                    x1="15.92"
                    x2="28.92"
                    y1="16"
                    y2="16"
                  />
                  <path d="M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z" />
                  <line
                    className={classNames('cls-1', [styles['logout-arrow']])}
                    x1="28.92"
                    x2="24.92"
                    y1="16"
                    y2="20"
                  />
                  <line
                    className={classNames('cls-1', [styles['logout-arrow']])}
                    x1="28.92"
                    x2="24.92"
                    y1="16"
                    y2="12"
                  />
                  <line
                    className="cls-1"
                    x1="24.92"
                    x2="24.92"
                    y1="8.09"
                    y2="6.09"
                  />
                  <line
                    className="cls-1"
                    x1="24.92"
                    x2="24.92"
                    y1="26"
                    y2="24"
                  />
                </g>
              </svg>
            </Block>
          </li>
        ))}
    </ul>
  );
};

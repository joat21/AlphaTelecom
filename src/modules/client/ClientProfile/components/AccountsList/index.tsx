import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

import { Block } from '@UI';

import { useLazyFetchUserByTokenQuery, User } from '@services/authApi';
import { changeActiveUserId, removeToken } from '@store/Auth/slice';
import { selectAuth } from '@store/Auth/selectors';

import clientLogo from '@assets/img/profile/client-logo.svg';
import logoutIcon from '@assets/img/profile/logout.svg';

import styles from './AccountsList.module.scss';

export const AccountsList = () => {
  const dispatch = useDispatch();
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();
  const { activeUserId, tokens } = useSelector(selectAuth);
  const [userProfiles, setUserProfiles] = useState<User[]>();

  useEffect(() => {
    const fetchProfiles = async () => {
      const promises = Object.values(tokens).map((token) => {
        // снова из за бага апи беру данные не из ответа, а из токена
        fetchUserByToken(token).unwrap();

        return jwtDecode<User>(token);
      });
      const userProfiles = await Promise.all(promises);

      const sortedProfiles = userProfiles.sort((a, b) => {
        if (a.id === activeUserId) return -1;
        if (b.id === activeUserId) return 1;
        return 0;
      });

      setUserProfiles(sortedProfiles);
    };

    fetchProfiles();
  }, [activeUserId, tokens, fetchUserByToken]);

  return (
    <ul className={styles['accounts-list']}>
      {userProfiles &&
        userProfiles.map((user) => (
          <li
            key={user.id}
            className={styles.client}
            onClick={() => dispatch(changeActiveUserId(user.id))}
          >
            <Block className={styles.block}>
              <img src={clientLogo} alt="logo" />
              <div>
                <span>
                  {user.name} {user.surname}
                </span>
                <span>{user.phone}</span>
              </div>
              <img
                width={40}
                height={40}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeToken(user.id));
                }}
                src={logoutIcon}
                alt="Выйти"
              />
            </Block>
          </li>
        ))}
    </ul>
  );
};

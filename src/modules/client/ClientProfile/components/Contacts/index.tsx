import styles from './Contacts.module.scss';
import clientLogo from '@assets/img/profile/client-logo.svg';
import logoutIcon from '@assets/img/profile/logout.svg';
import { Block } from '@UI';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useLazyFetchUserByTokenQuery, User } from '@services/authApi';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { removeToken } from '@store/Auth/slice';

export const Contacts = () => {
  const dispatch = useDispatch();
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();
  const { activeUserId, tokens } = useSelector(
    (state: RootState) => state.auth
  );
  const [userProfiles, setUserProfiles] = useState<User[]>();

  useEffect(() => {
    const fetchProfiles = async () => {
      const promises = Object.values(tokens).map((token) => {
        // снова из за бага апи не запрашиваю данные, а беру из токена
        // fetchUserByToken(token).unwrap()

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
  }, [tokens, fetchUserByToken]);

  return (
    <ul className={styles.contacts}>
      {userProfiles &&
        userProfiles.map((user) => (
          <li key={user.id} className={styles.client}>
            <Block className={styles.block}>
              <img src={clientLogo} alt="logo" />
              <div>
                <span>
                  {user.name} {user.surname}
                </span>
                <span>{user.phone}</span>
              </div>
              <img
                style={{ cursor: 'pointer' }}
                width={40}
                height={40}
                onClick={() => {
                  dispatch(removeToken(user.id));

                  // if (Object.keys(tokens).length > 0) {
                  //   navigate(0);
                  // }
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

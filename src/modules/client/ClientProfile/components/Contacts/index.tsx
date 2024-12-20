import styles from './Contacts.module.scss';
import clientLogo from '@assets/img/profile/client-logo.svg';
import { Block } from '@UI';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useLazyFetchUserByTokenQuery, User } from '@services/authApi';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const Contacts = () => {
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();
  const { tokens } = useSelector((state: RootState) => state.auth);
  const [userProfiles, setUserProfiles] = useState<User[]>();

  useEffect(() => {
    const fetchProfiles = async () => {
      const promises = Object.values(tokens).map((token) => {
        // снова из за бага апи не запрашиваю данные, а беру из токена
        // fetchUserByToken(token).unwrap()

        return jwtDecode<User>(token);
      });
      const userProfiles = await Promise.all(promises);
      setUserProfiles(userProfiles);
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
            </Block>
          </li>
        ))}
    </ul>
  );
};

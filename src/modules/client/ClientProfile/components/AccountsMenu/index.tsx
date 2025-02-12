import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { Loading } from '@components/Loading';
import { Block, Button, Container } from '@UI';
import { AccountCard } from '../AccountCard';
import { AccountsModal } from '../AccountsModal';

import { removeToken } from '@store/Auth/slice';
import { selectAuth } from '@store/Auth/selectors';
import { useLazyFetchUserByTokenQuery, User } from '@services/authApi';

import styles from './AccountsMenu.module.scss';

export const AccountsMenu = () => {
  const dispatch = useDispatch();
  const { activeUserId, tokens } = useSelector(selectAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleLogout = (id: number) => {
    dispatch(removeToken(id));
  };

  if (!userProfiles) return <Loading />;

  return (
    <Block className={styles.block}>
      <Container className={styles.wrapper}>
        <AccountCard
          user={userProfiles.find((user) => user.id === activeUserId)!}
          activeUserId={activeUserId!}
          onLogout={handleLogout}
        />
        <Button
          className={styles['button-plus']}
          onClick={() => setIsModalOpen(true)}
          variant="secondary"
        >
          +
        </Button>
        <AccountsModal
          onCancel={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          onLogout={handleLogout}
          userProfiles={
            userProfiles.filter((user) => user.id !== activeUserId)!
          }
          activeUserId={activeUserId!}
        />
      </Container>
    </Block>
  );
};

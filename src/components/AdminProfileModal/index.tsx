import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';

import profileLogo from '@assets/img/admin-profile-logo.svg';

import { selectAuth } from '@store/Auth/selectors';
import { useLazyFetchUserByTokenQuery, User } from '@services/authApi';

import styles from './AdminProfileModal.module.scss';
import { Button } from '@UI';
import { removeToken } from '@store/Auth/slice';
import { formatPhoneNumber } from 'helpers';

interface AdminProfileModalProps {
  isOpen: boolean;
  onCancel(): void;
}

export const AdminProfileModal: FC<AdminProfileModalProps> = ({
  isOpen,
  onCancel,
}) => {
  const dispatch = useDispatch();
  const { activeUserId, tokens } = useSelector(selectAuth);
  const [fetchUserByToken] = useLazyFetchUserByTokenQuery();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserByToken(tokens[activeUserId!]).unwrap();
      setUser(user);
    };

    fetchUser();
  }, [activeUserId, tokens, fetchUserByToken]);

  const handleLogout = () => {
    dispatch(removeToken(activeUserId!));
  };

  return (
    <Modal open={isOpen} onCancel={onCancel} footer={false}>
      <div className={styles.content}>
        <div className={styles.profile}>
          <img src={profileLogo} width={90} height={90} />
          {user && (
            <>
              <span>
                {user.surname} {user.name} {user.patronymic}
              </span>
              <span>{formatPhoneNumber(user.phone)}</span>
            </>
          )}
        </div>
        <Button className={styles['logout-btn']} onClick={handleLogout}>
          <svg
            className={styles['logout-icon']}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5003 4.1665C10.2902 4.1665 8.17057 5.04448 6.60777 6.60728C5.04497 8.17008 4.16699 10.2897 4.16699 12.4998V18.7498H8.33366V12.4998C8.33366 11.3948 8.77265 10.335 9.55405 9.55356C10.3354 8.77216 11.3953 8.33317 12.5003 8.33317H37.5003C38.6054 8.33317 39.6652 8.77216 40.4466 9.55356C41.228 10.335 41.667 11.3948 41.667 12.4998V37.4998C41.667 38.6049 41.228 39.6647 40.4466 40.4461C39.6652 41.2275 38.6054 41.6665 37.5003 41.6665H12.5003C11.3953 41.6665 10.3354 41.2275 9.55405 40.4461C8.77265 39.6647 8.33366 38.6049 8.33366 37.4998V31.2498H4.16699V37.4998C4.16699 39.71 5.04497 41.8296 6.60777 43.3924C8.17057 44.9552 10.2902 45.8332 12.5003 45.8332H37.5003C39.7105 45.8332 41.8301 44.9552 43.3929 43.3924C44.9557 41.8296 45.8337 39.71 45.8337 37.4998V12.4998C45.8337 10.2897 44.9557 8.17008 43.3929 6.60728C41.8301 5.04448 39.7105 4.1665 37.5003 4.1665H12.5003Z"
              fill="currentColor"
            />
            <path
              d="M6.25033 22.9165C5.69779 22.9165 5.16789 23.1359 4.77719 23.5266C4.38649 23.9173 4.16699 24.4473 4.16699 24.9998C4.16699 25.5523 4.38649 26.0822 4.77719 26.4729C5.16789 26.8636 5.69779 27.0831 6.25033 27.0831H26.2128L20.9316 32.3665C20.5521 32.7594 20.3421 33.2856 20.3468 33.8319C20.3516 34.3781 20.5707 34.9006 20.957 35.2869C21.3432 35.6732 21.8657 35.8923 22.412 35.897C22.9582 35.9018 23.4845 35.6918 23.8774 35.3123L32.6191 26.5706C32.8442 26.3754 33.0247 26.1342 33.1484 25.8632C33.2721 25.5921 33.3361 25.2977 33.3361 24.9998C33.3361 24.7019 33.2721 24.4074 33.1484 24.1364C33.0247 23.8654 32.8442 23.6241 32.6191 23.429L23.8753 14.6873C23.6831 14.4883 23.4533 14.3296 23.1991 14.2204C22.9449 14.1112 22.6715 14.0538 22.3949 14.0513C22.1183 14.0489 21.844 14.1017 21.5879 14.2064C21.3319 14.3112 21.0993 14.4659 20.9037 14.6615C20.7081 14.8571 20.5534 15.0897 20.4486 15.3457C20.3439 15.6017 20.2912 15.8761 20.2936 16.1527C20.296 16.4293 20.3534 16.7027 20.4626 16.9569C20.5718 17.2111 20.7305 17.4409 20.9295 17.6331L26.2128 22.9165H6.25033Z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </div>
    </Modal>
  );
};

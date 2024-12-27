import { Block } from '@UI';
import classNames from 'classnames';
import styles from './AccountCard.module.scss';
import { User } from '@services/authApi';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { changeActiveUserId } from '@store/Auth/slice';

interface AccountCard {
  user: User;
  activeUserId: number;
  onLogout(e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number): void;
  onCancelModal(): void;
}

export const AccountCard: FC<AccountCard> = ({
  user,
  activeUserId,
  onLogout,
  onCancelModal,
}) => {
  const dispatch = useDispatch();

  const onChangeAccount = (id: number) => {
    dispatch(changeActiveUserId(id));
    onCancelModal();
  };

  return (
    <Block
      className={classNames(styles.block, {
        [styles.active]: activeUserId === user.id,
      })}
      onClick={() => onChangeAccount(user.id)}
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
          <line className="cls-1" x1="24.92" x2="24.92" y1="8.09" y2="6.09" />
          <line className="cls-1" x1="24.92" x2="24.92" y1="26" y2="24" />
        </g>
      </svg>
    </Block>
  );
};

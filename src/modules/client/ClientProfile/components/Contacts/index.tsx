import styles from './Contacts.module.scss';
import clientLogo from '@assets/img/profile/client-logo.svg';
import { Block } from '@UI';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/Auth/selectors';

export const Contacts = () => {
  const user = useSelector(selectUser);

  return (
    <ul className={styles.contacts}>
      <li className={styles.client}>
        <Block className={styles.block}>
          <img src={clientLogo} alt="logo" />
          <div>
            <span>{user?.name}</span>

            <span>{user?.phone}</span>
          </div>
        </Block>
      </li>
    </ul>
  );
};

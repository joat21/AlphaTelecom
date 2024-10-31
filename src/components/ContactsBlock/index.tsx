import styles from './ContactsBlock.module.scss';
import clientLogo from '../../assets/img/profile/client-logo.svg';

export const ContactsBlock = () => {
  return (
    <div className={styles.block}>
      <img src={clientLogo} alt="logo" />
      <h2>Иван Иванов</h2>
      <h2>+7 000 000 00</h2>
    </div>
  );
};

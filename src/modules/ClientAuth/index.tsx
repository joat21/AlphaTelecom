import styles from './ClientAuth.module.scss';

const ClientAuth = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.container__header}>Введите номер телефона</h3>
      <form>
        <input type="tel" className={styles.container__input} placeholder="+7" />
        <button type="submit" className={styles.container__button}>
          Далее
        </button>
      </form>
    </div>
  );
};
export default ClientAuth;

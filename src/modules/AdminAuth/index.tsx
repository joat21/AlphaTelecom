import styles from './AdminAuth.module.scss';

const AdminAuth = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.container__header}>Введите логин и пароль</h3>
      <form>
        <input type="text" className={styles.container__input} placeholder="Логин" />
        <input type="password" className={styles.container__input} placeholder="Пароль" />
        <button type="submit" className={styles.container__button}>
          Далее
        </button>
      </form>
    </div>
  );
};
export default AdminAuth;

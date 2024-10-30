import { FormEvent, useState } from 'react';
import styles from './ClientAuth.module.scss';
import { LoginRequest, useLoginMutation } from '../../services/authApi';
import { useNavigate } from 'react-router-dom';

const ClientAuth = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<LoginRequest>({
    login: '',
    password: '',
  });

  const [login] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(formState).unwrap();
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.container__header}>Введите номер телефона</h3>
      <form onSubmit={handleSubmit}>
        <input
          // value={formState.login}
          onChange={handleChange}
          type="text"
          name="login"
          className={styles.container__input}
          placeholder="Логин"
        />
        <input
          // value={formState.password}
          onChange={handleChange}
          type="password"
          name="password"
          className={styles.container__input}
          placeholder="Пароль"
        />
        <button type="submit" className={styles.container__button}>
          Далее
        </button>
      </form>
    </div>
  );
};
export default ClientAuth;

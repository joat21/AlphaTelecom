import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Block, Button, Input } from '../../UI';
import { LoginRequest, useLoginMutation } from '../../services/authApi';
import { ROUTES } from '../../constants/routes';
import styles from './ClientAuth.module.scss';

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
      navigate('/' + ROUTES.CLIENT.PROFILE);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Block className={styles.wrapper}>
      <h1>Введите номер телефона</h1>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          type="text"
          name="login"
          placeholder="Логин"
          required
        />
        <Input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <Button type="submit" className={styles.btn}>
          Далее
        </Button>
      </form>
    </Block>
  );
};
export default ClientAuth;

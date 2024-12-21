import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { Balance } from '../Balance';
import { Remains } from '../Remains';
import { Tariff } from '../Tariff';
import { Services } from '../Services';

import { useGetTariffQuery } from '@services/tariffsApi';
import { User } from '@services/authApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './Profile.module.scss';

export const Profile = () => {
  const { activeUserId, tokens } = useSelector(selectAuth);
  const { tariffId } = jwtDecode<User>(tokens[activeUserId!]);
  const { data, isLoading } = useGetTariffQuery(tariffId.toString());

  if (!data || isLoading) {
    return 'Загрузка';
  }

  return (
    <div className={styles.block}>
      <Balance />
      <Remains />
      <div className={styles['tariff-services']}>
        <Tariff title={data.title} />
        <Services tariff={data} />
      </div>
    </div>
  );
};

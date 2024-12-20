import { Balance } from '../Balance';
import { Remains } from '../Remains';
import { Tariff } from '../Tariff';
import { Services } from '../Services';

import styles from './Info.module.scss';
import { useGetTariffQuery } from '../../../../../services/tariffsApi';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { User } from '@services/authApi';
import { RootState } from '@store/store';

export const Info = () => {
  const { activeUserId, tokens } = useSelector(
    (state: RootState) => state.auth
  );
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

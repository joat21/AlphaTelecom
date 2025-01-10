import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

import { Balance } from '../Balance';
import { Remains } from '../Remains';
import { Tariff } from '../Tariff';
import { Services } from '../Services';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { useGetClientRemainsQuery } from '@services/clientsApi';
import { useGetTariffQuery } from '@services/tariffsApi';
import { User } from '@services/authApi';
import { selectAuth } from '@store/Auth/selectors';
import { Loading } from '@components/Loading';

import styles from './Profile.module.scss';

export const Profile = () => {
  const { activeUserId, tokens } = useSelector(selectAuth);
  const { tariffId } = jwtDecode<User>(tokens[activeUserId!]);

  const { data: servicesData, isLoading: isServicesDataLoading } = useGetServicesDataQuery();

  const { data: remainsData, isLoading: isRemainsLoading } = useGetClientRemainsQuery(
    activeUserId!,
  );

  const { data: tariff, isLoading: isTariffLoading } = useGetTariffQuery(tariffId.toString());

  if (
    !tariff ||
    isTariffLoading ||
    !servicesData ||
    isServicesDataLoading ||
    !remainsData ||
    isRemainsLoading
  ) {
    return <Loading />;
  }

  return (
    <div className={styles.block}>
      <Balance />
      <Remains servicesData={servicesData[0].basicServicesData} remainsData={remainsData} />
      <div className={styles['tariff-services']}>
        <Tariff title={tariff.title} />
        <Services tariff={tariff} servicesData={servicesData[0]} />
      </div>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { PersonalInfo } from '../PersonalInfo';
import { TariffInfo } from '../TariffInfo';
import { Button } from '@UI';
import { useLazyFetchUserByIdQuery, User } from '@services/authApi';
import { useLazyGetTariffQuery } from '@services/tariffsApi';
import { Loading } from '@components/Loading';

import styles from './ClientInfo.module.scss';

import { useParams } from 'react-router-dom';
import { useGetTariffQuery } from '@services/tariffsApi';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { TariffWithImage } from '../../../../../entities/model';

export const ClientInfo = () => {
  const { id = '' } = useParams();
  const [fetchUserById] = useLazyFetchUserByIdQuery();
  const [getTariff] = useLazyGetTariffQuery();
  const { data: servicesData, isLoading: isServicesDataLoading } = useGetServicesDataQuery();
  const [user, setUser] = useState<User>();
  const [tariff, setTariff] = useState<TariffWithImage>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserById(id).unwrap();
      setUser(user);
    };
    const fetchTariff = async (tariffId: string) => {
      const tariff = await getTariff(tariffId).unwrap();
      setTariff(tariff);
    };

    fetchUser();
    if (user?.tariffId) {
      fetchTariff(user.tariffId.toString());
    }
  }, [fetchUserById, getTariff, user, tariff]);

  const formikRef = useRef<any>(null);
  if (isServicesDataLoading || !user || !tariff || !servicesData) return <Loading />;

  return (
    <div className={styles.block}>
      <PersonalInfo user={user} formikRef={formikRef} />
      <TariffInfo tariff={tariff} servicesData={servicesData[0]} />

      <Button
        onClick={() => {
          if (formikRef.current) {
            formikRef.current.submitForm();
          }
        }}
        className={styles.button}
      >
        Изменить
      </Button>
    </div>
  );
};

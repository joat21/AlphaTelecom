import { useLocation } from 'react-router-dom';

import { TariffCard } from '../TariffCard';

import { Block, Button } from '@UI';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './ChangeTariff.module.scss';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../store/Auth/selectors';
import { User } from '../../../../../services/authApi';
import { useGetTariffQuery } from '../../../../../services/tariffsApi';
import {
  useChangeUserMutation,
  useGetClientRemainsQuery,
} from '../../../../../services/clientsApi';

import { Loading } from '@components/Loading';

import arrow from '@assets/img/change-tariff/arrow.svg';

export const ChangeTariff = () => {
  const { activeUserId, tokens } = useSelector(selectAuth);
  const { tariffId } = jwtDecode<User>(tokens[activeUserId!]);

  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  const { data: remainsData, isLoading: isRemainsLoading } = useGetClientRemainsQuery(
    activeUserId!,
  );

  const currentDate: Date = new Date();
  const year: number = currentDate.getFullYear();
  const month: string = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day: string = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate: string = `${day}.${month}.${year}`;

  const { data: tariff, isLoading: isTariffLoading } = useGetTariffQuery(tariffId.toString());
  const [changeUser] = useChangeUserMutation();
  const location = useLocation();
  if (
    !remainsData ||
    !servicesData ||
    isLoading ||
    !tariff ||
    isTariffLoading ||
    isRemainsLoading
  ) {
    return <Loading />;
  }

  const handleChangeTariff = () => {
    changeUser({ id: activeUserId!, tariffId: location.state.tariff.id });
  };

  return (
    <Block className={styles.block}>
      <h2>
        Вы уверены в смене {tariff.title} на {location.state.tariff.title}?
      </h2>
      <div className={styles.carts}>
        <TariffCard tariff={tariff} servicesData={servicesData[0]} />
        <img src={arrow} alt="arrow" />
        <TariffCard tariff={location.state.tariff} servicesData={servicesData[0]} />
      </div>
      <div className={styles.change}>
        <span>
          При смене тарифа ваш ежемесячный платеж меняется с {tariff.price} ₽/МЕС. на{' '}
          {location.state.tariff.price} ₽/МЕС. {formattedDate}
        </span>
        <Button onClick={handleChangeTariff} className={styles.button}>
          СМЕНИТЬ
        </Button>
      </div>
    </Block>
  );
};

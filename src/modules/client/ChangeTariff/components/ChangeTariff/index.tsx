import { useLocation } from 'react-router-dom';

import { OldTariff } from '../OldTariff';
import { NewTariff } from '../NewTariff';
import { Block, Button } from '@UI';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './ChangeTariff.module.scss';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../../store/Auth/selectors';
import { User } from '../../../../../services/authApi';
import { useGetTariffQuery } from '../../../../../services/tariffsApi';
import {
  useChangeTariffMutation,
  useGetClientRemainsQuery,
} from '../../../../../services/clientsApi';

import arrow from '@assets/img/change-tariff/arrow.svg';

export const ChangeTariff = () => {
  const { activeUserId, tokens } = useSelector(selectAuth);
  const { tariffId } = jwtDecode<User>(tokens[activeUserId!]);

  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  const { data: remainsData, isLoading: isRemainsLoading } = useGetClientRemainsQuery(
    activeUserId!,
  );

  const { data: tariff, isLoading: isTariffLoading } = useGetTariffQuery(tariffId.toString());
  const [changeTariff] = useChangeTariffMutation();
  const location = useLocation();
  if (!servicesData || isLoading || !tariff || isTariffLoading || isRemainsLoading) {
    return 'Загрузка';
  }

  const handleChangeTariff = () => {
    changeTariff(tariff.id);
  };

  return (
    <Block className={styles.block}>
      <OldTariff tariff={tariff} servicesData={servicesData[0]} remainsData={remainsData} />
      <img src={arrow} alt="arrow" />
      <NewTariff {...location.state.tariff} servicesData={servicesData[0]} />
      <div>
        <span>
          При смене тарифа ваш ежемесячный платеж меняется с 000 ₽/МЕС. на 000 ₽/МЕС. 01.01.2025
        </span>
        <Button onClick={handleChangeTariff}>СМЕНИТЬ</Button>
      </div>
    </Block>
  );
};

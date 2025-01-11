import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import arrow from '@assets/img/change-tariff/arrow.svg';

import { Loading } from '@components/Loading';
import { TariffCard } from '../TariffCard';
import { Block, Button } from '@UI';

import { formatDate } from 'helpers';
import { getDiscount } from '../helpers/getDiscount';

import { selectAuth } from '@store/Auth/selectors';
import {
  useGetPriceListQuery,
  useGetServicesDataQuery,
} from '@services/servicesConfigApi';
import { User } from '@services/authApi';
import { useGetTariffQuery } from '@services/tariffsApi';
import {
  useChangeUserMutation,
  useGetClientRemainsQuery,
} from '@services/clientsApi';

import styles from './ChangeTariff.module.scss';

export const ChangeTariff = () => {
  const { activeUserId, tokens } = useSelector(selectAuth);
  const [changeUser] = useChangeUserMutation();
  const location = useLocation();

  const { tariffId } = jwtDecode<User>(tokens[activeUserId!]);

  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  const { data: remainsData, isLoading: isRemainsDataLoading } =
    useGetClientRemainsQuery(activeUserId!);

  const { data: tariff, isLoading: isTariffLoading } = useGetTariffQuery(
    tariffId.toString()
  );

  const { data: priceList, isLoading: isPriceListLoading } =
    useGetPriceListQuery();

  if (
    !servicesData ||
    isLoading ||
    !tariff ||
    isTariffLoading ||
    !remainsData ||
    isRemainsDataLoading ||
    !priceList ||
    isPriceListLoading
  ) {
    return <Loading />;
  }

  const { discount, discountPercentage } = getDiscount(
    remainsData,
    priceList[0],
    location.state.tariff.price
  );

  const handleChangeTariff = () => {
    changeUser({ id: activeUserId!, tariffId: location.state.tariff.id });
  };

  return (
    <Block className={styles.block}>
      <h2>
        Вы уверены в смене тарифа "{tariff.title}" на тариф "
        {location.state.tariff.title}"?
      </h2>
      <div className={styles.carts}>
        <TariffCard tariff={tariff} servicesData={servicesData[0]} />
        <img src={arrow} alt="" />
        <TariffCard
          tariff={location.state.tariff}
          servicesData={servicesData[0]}
        />
      </div>
      <div className={styles.change}>
        <div className={styles['price-info']}>
          <p>
            При смене тарифа действует скидка {discountPercentage}% - оплата за
            первый месяц составит {location.state.tariff.price - discount}₽.
          </p>
          <p>
            Далее каждый месяц, начиная с {formatDate(new Date())}, будет
            списываться {location.state.tariff.price} ₽/МЕС.
          </p>
        </div>
        <Button onClick={handleChangeTariff} className={styles.button}>
          СМЕНИТЬ
        </Button>
      </div>
    </Block>
  );
};

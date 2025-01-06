import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Button } from '@UI';
import { TariffActionModal } from '@components/TariffActionModal';
import { BasicServicesList } from '../BasicServicesList';
import { IncludedServices } from '../IncludedServices';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { useGetTariffQuery } from '@services/tariffsApi';
import { useAddItemMutation } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './TariffOverview.module.scss';
import { useChangeTariffMutation } from '../../../../../services/clientsApi';

export const TariffOverview: FC = () => {
  const { id = '' } = useParams();
  const { activeUserId, guestId } = useSelector(selectAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [changeTariff] = useChangeTariffMutation();
  const [addItem] = useAddItemMutation();
  const { data: tariff, isLoading } = useGetTariffQuery(id);
  const { data: servicesData, isLoading: isSerivcesDataLoading } = useGetServicesDataQuery();

  if (isSerivcesDataLoading || !servicesData || isLoading || !tariff) return 'Загрузка...';

  const { title, price, basicServices, unlimitedApps, extraServices, overviewImageUrl } = tariff;

  const addTariffToCart = () =>
    addItem({
      tariff,
      userId: (activeUserId ?? guestId)!,
    });

  const handleAddTariffToCart = () => {
    if (activeUserId) {
      setIsModalOpen(true);
    } else {
      addTariffToCart();
    }
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title} style={{ color: classNames({ 'var(--red)': tariff.id === 5 }) }}>
        {title}
      </h1>
      <div className={styles.top}>
        <BasicServicesList
          services={basicServices}
          servicesData={servicesData[0].basicServicesData}
        />
        <Button onClick={handleAddTariffToCart} className={styles.btn}>
          Купить за {price} руб/мес
        </Button>
      </div>

      <div className={styles.bottom}>
        <IncludedServices
          services={[unlimitedApps, extraServices]}
          servicesData={servicesData[0]}
        />
        <img src={overviewImageUrl} className={styles.img} />
      </div>
      <TariffActionModal
        isOpen={isModalOpen}
        tariff={tariff}
        onCancel={() => setIsModalOpen(false)}
        onAddTariffToCart={addTariffToCart}
      />
    </div>
  );
};

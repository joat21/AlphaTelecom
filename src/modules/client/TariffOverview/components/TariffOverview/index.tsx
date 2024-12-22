import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { BasicServicesList } from '../BasicServicesList';
import { IncludedServices } from '../IncludedServices';
import { Button } from '@UI';
import Modal from '@components/ModalApp';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { useGetTariffQuery } from '@services/tariffsApi';
import { useAddItemMutation } from '@services/cartApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './TariffOverview.module.scss';

export const TariffOverview: FC = () => {
  const { id = '' } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeUserId, guestId } = useSelector(selectAuth);
  const [addItem] = useAddItemMutation();
  const { data: servicesData, isLoading: isSerivcesDataLoading } =
    useGetServicesDataQuery();
  const { data: tariff, isLoading } = useGetTariffQuery(id);

  if (isSerivcesDataLoading || !servicesData || isLoading || !tariff)
    return 'Загрузка...';

  const { title, price, basicServices, unlimitedApps, extraServices } = tariff;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addTariffToCart = () =>
    addItem({
      tariff,
      userId: (activeUserId ?? guestId)!,
    });

  const onClickAdd = () => {
    if (activeUserId) {
      showModal();
    } else {
      addTariffToCart();
    }
  };

  return (
    <div className={styles.root}>
      <h1
        className={styles.title}
        style={{ color: classNames({ 'var(--red)': tariff.id === 5 }) }}
      >
        {title}
      </h1>
      <div className={styles.top}>
        <BasicServicesList
          services={basicServices}
          servicesData={servicesData[0].basicServicesData}
        />
        <Button onClick={onClickAdd} className={styles.btn}>
          Купить за {price} руб/мес
        </Button>
      </div>
      <div className={styles.bottom}>
        <IncludedServices
          services={[unlimitedApps, extraServices]}
          servicesData={servicesData[0]}
        />
      </div>
      <Modal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        tariff={tariff}
        onClickAdd={() => {
          addTariffToCart();
          handleCancel();
        }}
      />
    </div>
  );
};

import { useLocation } from 'react-router-dom';

import { Confirming } from '../Confirming';
import { NewTariff } from '../NewTariff';
import { Block } from '@UI';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './ChangeTariff.module.scss';

export const ChangeTariff = () => {
  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  const location = useLocation();
  if (!servicesData || isLoading) {
    return 'Загрузка';
  }

  return (
    <Block className={styles.block}>
      <NewTariff {...location.state.tariff} servicesData={servicesData} />
      <Confirming />
    </Block>
  );
};

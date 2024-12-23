import { useLocation } from 'react-router-dom';

import { CartItem } from '../../../Cart/components/CartItem';
import { Confirming } from '../Confirming';
import { Block } from '@UI';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './Cart.module.scss';

export const Control = () => {
  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  const location = useLocation();
  if (!servicesData || isLoading) {
    return 'Загрузка';
  }

  return (
    <Block className={styles.block}>
      <CartItem
        {...location.state.tariff}
        servicesData={servicesData}
        index={0}
      />
      <Confirming />
    </Block>
  );
};

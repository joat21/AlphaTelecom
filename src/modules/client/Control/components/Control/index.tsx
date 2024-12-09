import { CartItem } from '../../../Cart/components/CartItem';

import styles from './Cart.module.scss';

import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { Block } from '@UI';
import { Confirming } from '../Confirming';

import { useLocation } from 'react-router-dom';

export const Control = () => {
  const { data: servicesData, isLoading } = useGetServicesDataQuery();

  //console.log(items);
  const location = useLocation();
  if (!servicesData || isLoading) {
    return 'Загрузка';
  }

  return (
    <Block className={styles.block}>
      <CartItem {...location.state.tariff} servicesData={servicesData} index={0} />
      <Confirming />
    </Block>
  );
};

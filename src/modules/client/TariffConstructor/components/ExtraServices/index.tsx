import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import {
  selectConfig,
  selectExtraServices,
} from '@store/TariffConstructor/selectors';
import { setExtraService } from '@store/TariffConstructor/slice';
import { ExtraServiceData } from '@entities/model';

import styles from './ExtraServices.module.scss';

interface ExtraServicesProps {
  servicesData: Record<string, ExtraServiceData>;
}

export const ExtraServices: FC<ExtraServicesProps> = ({ servicesData }) => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const tariffExtraServices = useSelector(selectExtraServices);
  const extraServicesValuesArray = Object.values(config.extraServices);

  return (
    <section className={styles.root}>
      <SectionTitle>Дополнительно</SectionTitle>
      <ul className={styles.extras}>
        {extraServicesValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              label={servicesData[item.id].label}
              imageUrl={servicesData[item.id].imageUrl}
              isChecked={tariffExtraServices[item.id]}
              onChange={(isChecked) =>
                dispatch(
                  setExtraService({
                    serviceName: item.id,
                    newValue: isChecked,
                  })
                )
              }
              {...item}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

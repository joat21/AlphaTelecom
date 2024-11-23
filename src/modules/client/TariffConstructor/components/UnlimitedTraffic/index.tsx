import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import {
  selectConfig,
  selectUnlimitedApps,
} from '@store/TariffConstructor/selectors';
import { setUnlimitedApp } from '@store/TariffConstructor/slice';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './UnlimitedTraffic.module.scss';

export const UnlimitedTraffic: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();
  const tariffUnlimitedApps = useSelector(selectUnlimitedApps);
  const unlimitedAppsValuesArray = Object.values(config.unlimitedApps);

  if (isLoading || !servicesData) return 'Загрузка...';

  return (
    <section className={styles.root}>
      <SectionTitle>Бесконечный трафик</SectionTitle>
      <ul className={styles.switches}>
        {unlimitedAppsValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              label={servicesData[0].unlimitedAppsData[item.id].label}
              imageUrl={servicesData[0].unlimitedAppsData[item.id].imageUrl}
              isChecked={tariffUnlimitedApps[item.id]}
              onChange={(isChecked) =>
                dispatch(
                  setUnlimitedApp({
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

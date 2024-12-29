import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import {
  selectConfig,
  selectUnlimitedApps,
} from '@store/TariffConstructor/selectors';
import { setUnlimitedApp } from '@store/TariffConstructor/slice';
import { UnlimitedAppData } from '@entities/model';

import styles from './UnlimitedTraffic.module.scss';

interface UnlimitedTrafficProps {
  servicesData: Record<string, UnlimitedAppData>;
}

export const UnlimitedTraffic: FC<UnlimitedTrafficProps> = ({
  servicesData,
}) => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const tariffUnlimitedApps = useSelector(selectUnlimitedApps);
  const unlimitedAppsValuesArray = Object.values(config.unlimitedApps);

  return (
    <section className={styles.root}>
      <SectionTitle>Бесконечный трафик</SectionTitle>
      <ul className={styles.switches}>
        {unlimitedAppsValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              label={servicesData[item.id].label}
              imageUrl={servicesData[item.id].imageUrl}
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

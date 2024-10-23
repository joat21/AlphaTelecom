import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import { selectConfig, selectUnlimitedApps } from '../../store/selectors';
import { setUnlimitedApp } from '../../store/slice';

import styles from './UnlimitedTraffic.module.scss';
import { selectServicesData } from '../../../../store/servicesData/selectors';

export const UnlimitedTraffic: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const { unlimitedAppsData } = useSelector(selectServicesData);
  const tariffUnlimitedApps = useSelector(selectUnlimitedApps);
  const unlimitedAppsValuesArray = Object.values(config.unlimitedApps);

  return (
    <section className={styles.root}>
      <SectionTitle>Бесконечный трафик</SectionTitle>
      <ul className={styles.switches}>
        {unlimitedAppsValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              label={unlimitedAppsData[item.id].label}
              imageUrl={unlimitedAppsData[item.id].imageUrl}
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

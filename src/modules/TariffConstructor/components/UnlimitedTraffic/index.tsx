import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import { selectConfig, selectUnlimitedApps } from '../../store/selectors';
import { setUnlimitedApp } from '../../store/slice';

import styles from './UnlimitedTraffic.module.scss';

export const UnlimitedTraffic: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const unlimitedApps = useSelector(selectUnlimitedApps);
  const unlimitedAppsValuesArray = Object.values(config.unlimitedApps);

  const iconMap: Record<string, string> = {
    unlimitedSocials: './src/assets/img/services/socials.svg',
    unlimitedVideo: './src/assets/img/services/video.svg',
    unlimitedMusic: './src/assets/img/services/music.svg',
  };

  return (
    <section className={styles.root}>
      <SectionTitle>Бесконечный трафик</SectionTitle>
      <ul className={styles.switches}>
        {unlimitedAppsValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              imageUrl={iconMap[item.id]}
              isChecked={unlimitedApps[item.id]}
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

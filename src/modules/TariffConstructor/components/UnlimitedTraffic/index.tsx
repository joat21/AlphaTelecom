import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import { selectConfig, selectUnlimitedApps } from '../../store/selectors';
import { setUnlimitedApp } from '../../store/slice';

import styles from './UnlimitedTraffic.module.scss';

export const UnlimitedTraffic: FC = () => {
  const dispatch = useDispatch();
  const { unlimitedSocials, unlimitedMusic, unlimitedVideo } =
    useSelector(selectUnlimitedApps);

  const config = useSelector(selectConfig);
  const unlimitedAppsValuesArray = Object.values(config[0].unlimitedApps);

  const isCheckedMap: Record<string, boolean> = {
    unlimitedSocials: unlimitedSocials,
    unlimitedVideo: unlimitedVideo,
    unlimitedMusic: unlimitedMusic,
  };

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
              id={item.id}
              label={item.label}
              imageUrl={iconMap[item.id]}
              price={item.price}
              isChecked={isCheckedMap[item.id]}
              onChange={(isChecked) =>
                dispatch(
                  setUnlimitedApp({ serviceName: item.id, newValue: isChecked })
                )
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

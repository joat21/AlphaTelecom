import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import { selectConfig, selectUnlimitedApps } from '../../store/selectors';
import {
  setUnlimitedMusic,
  setUnlimitedSocials,
  setUnlimitedVideo,
} from '../../store/slice';

import styles from './UnlimitedTraffic.module.scss';

export const UnlimitedTraffic: FC = () => {
  const dispatch = useDispatch();
  const { unlimitedSocials, unlimitedMusic, unlimitedVideo } =
    useSelector(selectUnlimitedApps);

  const config = useSelector(selectConfig);
  const unlimitedAppsValuesArray = Object.values(config[0].unlimitedApps);

  const actionMap: Record<string, (isChecked: boolean) => void> = {
    socials: (isChecked) => dispatch(setUnlimitedSocials(isChecked)),
    video: (isChecked) => dispatch(setUnlimitedVideo(isChecked)),
    music: (isChecked) => dispatch(setUnlimitedMusic(isChecked)),
  };

  const isCheckedMap: Record<string, boolean> = {
    socials: unlimitedSocials,
    video: unlimitedVideo,
    music: unlimitedMusic,
  };

  const iconMap: Record<string, string> = {
    socials: './src/assets/img/services/socials.svg',
    video: './src/assets/img/services/video.svg',
    music: './src/assets/img/services/music.svg',
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
              onChange={(isChecked) => actionMap[item.id](isChecked)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

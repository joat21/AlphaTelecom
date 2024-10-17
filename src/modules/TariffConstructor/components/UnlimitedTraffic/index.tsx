import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import { selectUnlimitedApps } from '../../store/selectors';
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

  return (
    <section className={styles.root}>
      <SectionTitle>Бесконечный трафик</SectionTitle>
      <ul className={styles.switches}>
        <li>
          <ServiceToggle
            id="social"
            label="Соц.сети и мессенджеры"
            imageUrl="./src/assets/img/services/socials.svg"
            price={100}
            isChecked={unlimitedSocials}
            onChange={(isChecked) => dispatch(setUnlimitedSocials(isChecked))}
          />
        </li>
        <li>
          <ServiceToggle
            id="video"
            label="Видео в соц.сетях"
            imageUrl="./src/assets/img/services/video.svg"
            price={80}
            isChecked={unlimitedVideo}
            onChange={(isChecked) => dispatch(setUnlimitedVideo(isChecked))}
          />
        </li>
        <li>
          <ServiceToggle
            id="music"
            label="Музыка"
            imageUrl="./src/assets/img/services/music.svg"
            price={60}
            isChecked={unlimitedMusic}
            onChange={(isChecked) => dispatch(setUnlimitedMusic(isChecked))}
          />
        </li>
      </ul>
    </section>
  );
};

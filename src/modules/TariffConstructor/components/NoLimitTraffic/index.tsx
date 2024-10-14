import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectNoLimits,
  setNoLimitMusic,
  setNoLimitSocial,
  setNoLimitVideo,
} from '../../store/slice';

import styles from './NoLimitTraffic.module.scss';
import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

export const NoLimitTraffic: FC = () => {
  const dispatch = useDispatch();
  const { noLimitSocial, noLimitMusic, noLimitVideo } = useSelector(selectNoLimits);
  return (
    <section className={styles.root}>
      <SectionTitle>Бесконечный трафик</SectionTitle>
      <ul className={styles.switches}>
        <li>
          <ServiceToggle
            id="social"
            name="social"
            label="Соц.сети и мессенджеры"
            imageUrl="./src/assets/img/services/socials.svg"
            price={100}
            isChecked={noLimitSocial}
            onChange={(isChecked) => dispatch(setNoLimitSocial(isChecked))}
          />
        </li>
        <li>
          <ServiceToggle
            id="video"
            name="video"
            label="Видео в соц.сетях"
            imageUrl="./src/assets/img/services/video.svg"
            price={80}
            isChecked={noLimitVideo}
            onChange={(isChecked) => dispatch(setNoLimitVideo(isChecked))}
          />
        </li>
        <li>
          <ServiceToggle
            id="music"
            name="music"
            label="Музыка"
            imageUrl="./src/assets/img/services/music.svg"
            price={60}
            isChecked={noLimitMusic}
            onChange={(isChecked) => dispatch(setNoLimitMusic(isChecked))}
          />
        </li>
      </ul>
    </section>
  );
};

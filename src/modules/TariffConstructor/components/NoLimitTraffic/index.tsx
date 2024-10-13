import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, ToggleSwitch } from '../../../../UI';

import {
  selectNoLimits,
  setNoLimitMusic,
  setNoLimitSocial,
  setNoLimitVideo,
} from '../../store/slice';

import styles from './NoLimitTraffic.module.scss';

export const NoLimitTraffic: FC = () => {
  const dispatch = useDispatch();
  const { noLimitSocial, noLimitMusic, noLimitVideo } = useSelector(selectNoLimits);
  return (
    <section className={styles.root}>
      <h2>Бесконечный трафик</h2>
      <ul className={styles.switches}>
        <li>
          <Block>
            <ToggleSwitch
              id="social"
              name="social"
              label="Соц.сети и мессенджеры"
              isChecked={noLimitSocial}
              onChange={(isChecked) => dispatch(setNoLimitSocial(isChecked))}
            />
          </Block>
        </li>
        <li>
          <Block>
            <ToggleSwitch
              id="video"
              name="video"
              label="Видео в соц.сетях"
              isChecked={noLimitVideo}
              onChange={(isChecked) => dispatch(setNoLimitVideo(isChecked))}
            />
          </Block>
        </li>
        <li>
          <Block>
            <ToggleSwitch
              id="music"
              name="music"
              label="Музыка"
              isChecked={noLimitMusic}
              onChange={(isChecked) => dispatch(setNoLimitMusic(isChecked))}
            />
          </Block>
        </li>
      </ul>
    </section>
  );
};

import { FC } from 'react';
import { Block, ToggleSwitch } from '../../../../UI';
import styles from './NoLimitTraffic.module.scss';

export const NoLimitTraffic: FC = ({ services, setServices }) => {
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
              isChecked={services.noLimitSocial}
              onChange={(isChecked) => setServices({ ...services, noLimitSocial: isChecked })}
            />
          </Block>
        </li>
        <li>
          <Block>
            <ToggleSwitch
              id="video"
              name="video"
              label="Видео в соц.сетях"
              isChecked={services.noLimitVideo}
              onChange={(isChecked) => setServices({ ...services, noLimitVideo: isChecked })}
            />
          </Block>
        </li>
        <li>
          <Block>
            <ToggleSwitch
              id="music"
              name="music"
              label="Музыка"
              isChecked={services.noLimitMusic}
              onChange={(isChecked) => setServices({ ...services, noLimitMusic: isChecked })}
            />
          </Block>
        </li>
      </ul>
    </section>
  );
};

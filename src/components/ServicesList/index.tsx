import { FC } from 'react';
import styles from './ServicesList.module.scss';
import { Tariff } from '../../entities/model';

const noLimitsIcons = {
  noLimitSocial: './src/assets/img/services/socials.svg',
  noLimitVideo: './src/assets/img/services/video.svg',
  noLimitMusic: './src/assets/img/services/music.svg',
};

const extraServicesIcons = {
  intercityCalls: './src/assets/img/services/intercityCalls.svg',
};

interface ServicesListProps {
  tariff: Tariff;
  isTitlesVisible: boolean;
}

const ServicesList: FC<ServicesListProps> = ({ tariff, isTitlesVisible }) => {
  const { basic, noLimits, extra } = tariff;
  const noLimitsArray = Object.entries(noLimits);
  const extraServicesArray = Object.entries(extra);
  const noLimitsValuesArray = Object.values(noLimits);
  const extraServicesValuesArray = Object.values(extra);

  return (
    <>
      <ul className={styles.basic}>
        <li>{basic.internet} гб</li>
        <li>{basic.minutes} мин.</li>
        <li>{basic.sms} sms</li>
      </ul>
      <div className={styles.lists}>
        <div>
          {isTitlesVisible && noLimitsValuesArray.some((item) => item) && <span>Безлимит на:</span>}
          <ul className={styles.list}>
            {noLimitsArray.map(([key, value], i) => {
              if (!value) return null;
              return (
                <li style={{ zIndex: noLimitsArray.length - i }} key={key}>
                  <img src={noLimitsIcons[key]} alt="" />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          {isTitlesVisible && extraServicesValuesArray.some((item) => item) && (
            <span>Дополнительно:</span>
          )}
          <ul className={styles.list}>
            {extraServicesArray.map(([key, value], i) => {
              if (!value) return null;
              return (
                <li style={{ zIndex: extraServicesArray.length - i }} key={key}>
                  <img src={extraServicesIcons[key]} alt="" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ServicesList;

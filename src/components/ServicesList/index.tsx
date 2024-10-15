import { FC } from 'react';
import styles from './ServicesList.module.scss';
import { Tariff } from '../../entities/model';

const unlimitedAppsIcons = {
  unlimitedSocial: './src/assets/img/services/socials.svg',
  unlimitedVideo: './src/assets/img/services/video.svg',
  unlimitedMusic: './src/assets/img/services/music.svg',
};

const extraServicesIcons = {
  intercityCalls: './src/assets/img/services/intercityCalls.svg',
};

interface ServicesListProps {
  tariff: Tariff;
  isTitlesVisible: boolean;
}

const ServicesList: FC<ServicesListProps> = ({ tariff, isTitlesVisible }) => {
  const { basicServices, unlimitedApps, extraServices } = tariff;
  const noLimitsArray = Object.entries(unlimitedApps);
  const extraServicesArray = Object.entries(extraServices);
  const noLimitsValuesArray = Object.values(unlimitedApps);
  const extraServicesValuesArray = Object.values(extraServices);

  return (
    <>
      <ul className={styles.basic}>
        <li>{basicServices.internet} гб</li>
        <li>{basicServices.minutes} мин.</li>
        <li>{basicServices.sms} sms</li>
      </ul>
      <div className={styles.lists}>
        <div>
          {isTitlesVisible && noLimitsValuesArray.some((item) => item) && (
            <span>Безлимит на:</span>
          )}
          <ul className={styles.list}>
            {noLimitsArray.map(([key, value], i) => {
              if (!value) return null;
              return (
                <li style={{ zIndex: noLimitsArray.length - i }} key={key}>
                  <img src={unlimitedAppsIcons[key]} alt="" />
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

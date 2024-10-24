import { FC } from 'react';
import styles from './ServicesList.module.scss';
import { Tariff } from '../../entities/model';
import { BasicServicesList } from '../BasicServicesList';
import { ServiceIconsList } from '../ServiceIconsList';

const unlimitedAppsIcons = {
  unlimitedSocials: './src/assets/img/services/socials.svg',
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
  const noLimitsValuesArray = Object.values(unlimitedApps);
  const extraServicesValuesArray = Object.values(extraServices);

  return (
    <>
      <BasicServicesList services={basicServices} />
      <div className={styles.lists}>
        {noLimitsValuesArray.some((item) => item) && (
          <div>
            {isTitlesVisible && <span>Безлимит на:</span>}
            <ServiceIconsList
              services={unlimitedApps}
              serviceIcons={unlimitedAppsIcons}
            />
          </div>
        )}
        {extraServicesValuesArray.some((item) => item) && (
          <div>
            {isTitlesVisible && <span>Дополнительно:</span>}
            <ServiceIconsList
              services={extraServices}
              serviceIcons={extraServicesIcons}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ServicesList;

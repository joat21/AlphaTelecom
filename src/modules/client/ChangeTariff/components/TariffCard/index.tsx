import { FC } from 'react';
import { Block, Button } from '@UI';
import styles from './TariffCard.module.scss';
import { ServicesDataState, TariffWithImage, Remainder } from '@entities/model';

import { ServiceIconsList } from '../../../../../components/ServiceIconsList';
import { BasicServices } from '../../../TariffConstructor/components/BasicServices';

interface TariffCardProps {
  servicesData: ServicesDataState;
  tariff: TariffWithImage;
}

export const TariffCard: FC<TariffCardProps> = ({ tariff, servicesData }) => {
  const { unlimitedApps, extraServices, basicServices } = tariff;

  const unlimitedAppsArray = Object.entries(unlimitedApps);

  const extraServicesArray = Object.entries(extraServices);

  const filteredUnlimitedAppsArray = unlimitedAppsArray.filter((value) => value[1]);
  const filteredExtraServicesArray = extraServicesArray.filter((value) => value[1]);

  // const unlimitedAppsValuesArray = Object.values(unlimitedApps);

  // const extraServicesValuesArray = Object.values(extraServices);

  const extraServicesCount = extraServicesArray.filter((value) => value[1]).length;

  const unlimitedAppsCount = unlimitedAppsArray.filter((value) => value[1]).length;

  return (
    <Block className={styles.block}>
      <h2>{tariff.title}</h2>
      <h2>ВКЛЮЧАЕТ В СЕБЯ</h2>
      <Block className={styles.remains}>
        {/* <p>{remainsData.internet} ГБ.</p>
        <p>{remainsData.minutes} МИН.</p>
        <p>{remainsData.sms} SMS</p> */}
        <span>{basicServices.internet} ГБ.</span>
        <span>{basicServices.minutes} МИН.</span>
        <span>{basicServices.sms} SMS</span>
      </Block>
      <h2>БЕЗЛИМИТЫ</h2>
      <Block className={styles.background}>
        {/* {unlimitedAppsValuesArray.some((value) => value) && (
          <div>
            <ServiceIconsList
              services={unlimitedApps}
              servicesData={servicesData[0].unlimitedAppsData}
            />
          </div>
        )} */}
        <ul>
          {filteredUnlimitedAppsArray.map(([key, value]) => {
            if (unlimitedAppsCount == 0) return 'Нет';

            return (
              <li key={key}>
                <img src={servicesData.unlimitedAppsData[key].imageUrl} />
              </li>
            );
          })}
        </ul>
      </Block>
      <h2>ДОПОЛНИТЕЛЬНО</h2>
      <Block className={styles.background}>
        {/* {extraServicesValuesArray.some((value) => value) && (
          <div>
            <h2>ДОПОЛНИТЕЛЬНО</h2>
            <ServiceIconsList
              services={extraServices}
              servicesData={servicesData[0].extraServicesData}
            />
          </div>
          
        )} */}
        <ul>
          {extraServicesArray.map(([key, value]) => {
            if (extraServicesCount == 0) return 'Нет';

            return (
              <li key={key}>
                <img src={servicesData.extraServicesData[key].imageUrl} />
              </li>
            );
          })}
        </ul>
      </Block>
      <Button>ЗА {tariff.price} ₽/МЕС. </Button>
    </Block>
  );
};

/* <div className={styles.header}>
        <h2>УБЕДИТЕСЬ, ЧТО ВЫ ВЫБРАЛИ НУЖНЫЙ ТАРИФ</h2>
      </div>
      <Button className={styles.button}>СМЕНИТЬ ТАРИФ</Button> */

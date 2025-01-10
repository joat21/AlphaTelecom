import { FC } from 'react';
import { Block, Button } from '@UI';
import styles from './TariffCard.module.scss';
import { ServicesDataState, TariffWithImage } from '@entities/model';

interface TariffCardProps {
  servicesData: ServicesDataState;
  tariff: TariffWithImage;
}

export const TariffCard: FC<TariffCardProps> = ({ tariff, servicesData }) => {
  const { unlimitedApps, extraServices, basicServices } = tariff;

  const unlimitedAppsArray = Object.entries(unlimitedApps);

  const extraServicesArray = Object.entries(extraServices);

  const filteredUnlimitedAppsArray = unlimitedAppsArray.filter((value) => value[1]);

  const extraServicesCount = extraServicesArray.filter((value) => value[1]).length;

  const unlimitedAppsCount = unlimitedAppsArray.filter((value) => value[1]).length;

  return (
    <Block className={styles.block}>
      <h2>{tariff.title}</h2>
      <h2>ВКЛЮЧАЕТ В СЕБЯ</h2>
      <Block className={styles.remains}>
        <span>{basicServices.internet} ГБ.</span>
        <span>{basicServices.minutes} МИН.</span>
        <span>{basicServices.sms} SMS</span>
      </Block>
      <h2>БЕЗЛИМИТЫ</h2>
      <Block className={styles.background}>
        {unlimitedAppsCount > 0 && (
          <ul className={styles['unlimited-icons']}>
            {filteredUnlimitedAppsArray.map(([key]) => {
              return (
                <li key={key}>
                  <img src={servicesData.unlimitedAppsData[key].imageUrl} />
                </li>
              );
            })}
          </ul>
        )}
        {unlimitedAppsCount == 0 && <p>Нет</p>}
      </Block>
      <h2>ДОПОЛНИТЕЛЬНО</h2>
      <Block className={styles.background}>
        <ul>
          {extraServicesArray.map(([key]) => {
            if (extraServicesCount == 0) return 'Нет';

            return (
              <li key={key}>
                <img src={servicesData.extraServicesData[key].imageUrl} />
              </li>
            );
          })}
        </ul>
      </Block>
      <Button className={styles.button}>ЗА {tariff.price} ₽/МЕС. </Button>
    </Block>
  );
};

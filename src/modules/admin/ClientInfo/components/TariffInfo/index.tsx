import { FC } from 'react';
import { Block } from '@UI';
import styles from './TariffInfo.module.scss';
import { ServicesDataState, TariffWithImage } from '@entities/model';

interface TariffInfoProps {
  servicesData: ServicesDataState;
  tariff: TariffWithImage;
}

export const TariffInfo: FC<TariffInfoProps> = ({ tariff, servicesData }) => {
  const { basicServices, unlimitedApps, extraServices } = tariff;

  const unlimitedAppsArray = Object.entries(unlimitedApps);

  const extraServicesArray = Object.entries(extraServices);

  const filteredUnlimitedAppsArray = unlimitedAppsArray.filter((value) => value[1]);

  const extraServicesCount = extraServicesArray.filter((value) => value[1]).length;

  const unlimitedAppsCount = unlimitedAppsArray.filter((value) => value[1]).length;

  return (
    <div className={styles['tariff-info']}>
      <h2>Информация о тарифе</h2>
      <Block className={styles.block}>
        <h2>Тариф</h2>
        <Block className={styles.field}>{tariff.title}</Block>

        <h2>Стоимость тарифа</h2>
        <Block className={styles.field}>{tariff.price} ₽/МЕС</Block>
        <h2>Интернет</h2>
        <Block className={styles.field}>{tariff.basicServices.internet} ГБ.</Block>
        <h2>Минуты</h2>
        <Block className={styles.field}>{basicServices.minutes} МИН.</Block>
        <h2>SMS</h2>
        <Block className={styles.field}>{basicServices.sms} SMS</Block>

        <h2>Безлимиты</h2>
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
        <h2>Дополнительные услуги</h2>
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
      </Block>
    </div>
  );
};

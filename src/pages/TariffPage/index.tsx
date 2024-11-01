import { FC } from 'react';
import { Block, Button, Container } from '../../UI';
import { useParams } from 'react-router-dom';
import styles from './TariffPage.module.scss';
import { useGetTariffQuery } from '../../services/tariffsApi';
import { useGetServicesDataQuery } from '../../services/servicesConfigApi';

const TariffPage: FC = () => {
  const { id = '' } = useParams();
  const { data: servicesData, isLoading: isSerivcesDataLoading } = useGetServicesDataQuery();
  const { data: tariff, isLoading } = useGetTariffQuery(id);

  if (isSerivcesDataLoading || !servicesData || isLoading || !tariff) return 'Загрузка...';

  const { title, price, basicServices, unlimitedApps, extraServices } = tariff;
  const basicServicesEntriesArray = Object.entries(basicServices);
  const unlimitedAppsEntriesArray = Object.entries(unlimitedApps);
  const extraServicesEntriesArray = Object.entries(extraServices);

  return (
    <Container>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.top}>
        <ul className={styles.basic}>
          {basicServicesEntriesArray.map(([name, amount]) => {
            const basicServiceData = servicesData[0].basicServicesData[name];
            return (
              <li key={basicServiceData.id}>
                <Block style={{ padding: '28px 60px' }}>
                  {amount} {basicServiceData.measureUnit}
                </Block>
              </li>
            );
          })}
        </ul>
        <Button className={styles.btn} to="/">
          Купить за {price} руб/мес
        </Button>
      </div>
      <div className={styles.bottom}>
        <h2>Включено в тариф</h2>
        <ul className={styles.services}>
          {unlimitedAppsEntriesArray.map(([name, value]) => {
            if (!value) return null;
            const unlimitedAppData = servicesData[0].unlimitedAppsData[name];
            return (
              <li key={unlimitedAppData.id}>
                <Block>
                  <span>{unlimitedAppData.label}</span>
                  <img src={unlimitedAppData.imageUrl} alt={unlimitedAppData.label} />
                </Block>
              </li>
            );
          })}
          {extraServicesEntriesArray.map(([name, value]) => {
            if (!value) return null;
            const extraServiceData = servicesData[0].extraServicesData[name];
            return (
              <li key={extraServiceData.id}>
                <Block>
                  <span>{extraServiceData.label}</span>
                  <img src={extraServiceData.imageUrl} alt={extraServiceData.label} />
                </Block>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

export default TariffPage;

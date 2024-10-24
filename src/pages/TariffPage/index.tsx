import { FC, useEffect, useState } from 'react';
import { Block, Button, Container, PageTitle } from '../../UI';
import { useParams } from 'react-router-dom';
import { TariffWithImage } from '../../entities/model';
import { fetchTariff } from './api/fetchTariff';
import { ServiceIconsList } from '../../components/ServiceIconsList';
import styles from './TariffPage.module.scss';

const unlimitedAppsIcons = {
  unlimitedSocials: '../src/assets/img/services/socials.svg',
  unlimitedVideo: '../src/assets/img/services/video.svg',
  unlimitedMusic: '../src/assets/img/services/music.svg',
};

const extraServicesIcons = {
  intercityCalls: '../src/assets/img/services/intercityCalls.svg',
};

const TariffPage: FC = () => {
  const { id } = useParams();
  const [tariff, setTariff] = useState<TariffWithImage>();

  useEffect(() => {
    fetchTariff(id).then((data) => setTariff(data));
  }, []);

  if (!tariff) return 'Загрузка...';

  const { basicServices, unlimitedApps, extraServices } = tariff;

  return (
    <>
      <PageTitle>Тариф {tariff.title}</PageTitle>
      <Container>
        <div className={styles.services}>
          <Block>
            <ul>
              <li>{basicServices.internet} гб</li>
              <li>{basicServices.minutes} мин</li>
              <li>{basicServices.sms} смс</li>
            </ul>
          </Block>
          {Object.values(unlimitedApps).some((item) => item) && (
            <Block>
              <span>Безлимиты</span>
              <ServiceIconsList
                services={unlimitedApps}
                serviceIcons={unlimitedAppsIcons}
              />
            </Block>
          )}
          {Object.values(extraServices).some((item) => item) && (
            <Block>
              <span>Дополнительно</span>
              <ServiceIconsList
                services={extraServices}
                serviceIcons={extraServicesIcons}
              />
            </Block>
          )}
        </div>
        <Button className={styles.btn} to="/">
          Подключить за {tariff.price} руб/мес
        </Button>
      </Container>
    </>
  );
};

export default TariffPage;

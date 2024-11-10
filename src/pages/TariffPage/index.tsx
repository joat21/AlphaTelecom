import { FC } from 'react';
import { Container } from '../../UI';
import { TariffOverview } from '../../modules/TariffOverview';
import styles from './TariffPage.module.scss';

const TariffPage: FC = () => {
  return (
    <>
      <div className={styles['decorative-block']} />
      <Container>
        <TariffOverview />
      </Container>
    </>
  );
};

export default TariffPage;

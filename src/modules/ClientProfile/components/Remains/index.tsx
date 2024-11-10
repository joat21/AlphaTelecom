import styles from './Remains.module.scss';
import { Block } from '../../../../UI';
import { RemainsItem } from '../RemainsItem';
import { useGetServicesDataQuery } from '../../../../services/servicesConfigApi';

const remains = {
  id: 1,
  remains: {
    internet: 25,
    minutes: 45,
    sms: 15,
  },
};

const remainsArray = Object.entries(remains.remains);

export const Remains = () => {
  const { data: servicesData, isLoading } = useGetServicesDataQuery();
  if (isLoading || !servicesData) {
    return 'Loading';
  }
  return (
    <Block className={styles.block}>
      <h2>ОСТАТКИ</h2>
      <ul>
        {remainsArray.map(([key, value]) => (
          <li key={key}>
            <RemainsItem value={value} servicesData={servicesData[0].basicServicesData[key]} />
          </li>
        ))}
      </ul>
    </Block>
  );
};

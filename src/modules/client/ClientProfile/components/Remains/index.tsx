import { useSelector } from 'react-redux';

import { Block } from '@UI';
import { RemainsItem } from '../RemainsItem';

import { useGetClientRemainsQuery } from '@services/clientsApi';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { selectAuth } from '@store/Auth/selectors';

import styles from './Remains.module.scss';

export const Remains = () => {
  const { activeUserId } = useSelector(selectAuth);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();
  const { data: remainsData, isLoading: isRemainsLoading } =
    useGetClientRemainsQuery(activeUserId!);

  if (isLoading || !servicesData || isRemainsLoading || !remainsData) {
    return 'Loading';
  }

  const { internet, minutes, sms } = remainsData;

  const remainsArray = Object.entries({
    internet,
    minutes,
    sms,
  });

  return (
    <Block className={styles.block}>
      <h2>ОСТАТКИ</h2>
      <ul>
        {remainsArray.map(([key, value]) => (
          <li key={key}>
            <RemainsItem
              value={value}
              servicesData={servicesData[0].basicServicesData[key]}
            />
          </li>
        ))}
      </ul>
    </Block>
  );
};

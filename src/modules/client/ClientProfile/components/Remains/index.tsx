import { useSelector } from 'react-redux';

import { Block } from '@UI';
import { RemainsItem } from '../RemainsItem';

import { selectUser } from '@store/Auth/selectors';
import { useGetClientRemainsQuery } from '@services/clientsApi';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './Remains.module.scss';

export const Remains = () => {
  const user = useSelector(selectUser);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();
  const { data: remainsData, isLoading: isRemainsLoading } =
    useGetClientRemainsQuery(user?.id!);

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

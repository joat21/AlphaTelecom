import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, InputRange } from '@UI';
import { SectionTitle } from '../SectionTitle';

import { setBasicService } from '@store/TariffConstructor/slice';
import { selectConfig } from '@store/TariffConstructor/selectors';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';

import styles from './BasicServices.module.scss';

export const BasicServices: FC = () => {
  const dispatch = useDispatch();
  const { data: servicesData, isLoading } = useGetServicesDataQuery();
  const config = useSelector(selectConfig);
  const basicServicesValuesArray = Object.values(config.basicServices);

  if (isLoading || !servicesData) return 'Загрузка...';

  return (
    <section className={styles.root}>
      <SectionTitle>Основные услуги</SectionTitle>
      <ul className={styles.rangers}>
        {basicServicesValuesArray.map((item) => (
          <li key={item.id}>
            <Block style={{ padding: '40px 45px' }}>
              <InputRange
                id={item.id}
                label={servicesData[0].basicServicesData[item.id].label}
                datalist={item.values}
                onChange={(value) =>
                  dispatch(
                    setBasicService({
                      serviceName: item.id,
                      newValue: value,
                    })
                  )
                }
              />
            </Block>
          </li>
        ))}
      </ul>
    </section>
  );
};

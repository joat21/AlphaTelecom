import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, InputRange } from '@UI';
import { SectionTitle } from '../SectionTitle';

import { BasicServiceData } from '@entities/model';
import { setBasicService } from '@store/TariffConstructor/slice';
import { selectConfig } from '@store/TariffConstructor/selectors';

import styles from './BasicServices.module.scss';

interface BasicServicesProps {
  servicesData: Record<string, BasicServiceData>;
}

export const BasicServices: FC<BasicServicesProps> = ({ servicesData }) => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const basicServicesValuesArray = Object.values(config.basicServices);

  return (
    <section className={styles.root}>
      <SectionTitle>Основные услуги</SectionTitle>
      <ul className={styles.rangers}>
        {basicServicesValuesArray.map((item) => (
          <li key={item.id}>
            <Block style={{ padding: '40px 45px' }}>
              <InputRange
                id={item.id}
                label={servicesData[item.id].label}
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

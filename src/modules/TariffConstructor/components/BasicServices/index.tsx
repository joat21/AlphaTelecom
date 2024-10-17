import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, InputRange } from '../../../../UI';
import { SectionTitle } from '../SectionTitle';

import { setBasicService } from '../../store/slice';
import { selectConfig } from '../../store/selectors';

import styles from './BasicServices.module.scss';

export const BasicServices: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const basicServicesValuesArray = Object.values(config[0].basicServices);

  return (
    <section className={styles.root}>
      <SectionTitle>Основные услуги</SectionTitle>
      <ul className={styles.rangers}>
        {basicServicesValuesArray.map((item) => (
          <li key={item.id}>
            <Block style={{ padding: '40px 45px' }}>
              <InputRange
                id={item.id}
                label={item.label}
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

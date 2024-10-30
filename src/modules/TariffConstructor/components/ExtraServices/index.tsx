import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';

import { selectConfig, selectExtraServices } from '../../store/selectors';
import { setExtraService } from '../../store/slice';
import { useGetServicesDataQuery } from '../../../../services/servicesConfigApi';

import styles from './ExtraServices.module.scss';

export const ExtraServices: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const { data: servicesData, isLoading } = useGetServicesDataQuery();
  const tariffExtraServices = useSelector(selectExtraServices);
  const extraServicesValuesArray = Object.values(config.extraServices);

  if (isLoading || !servicesData) return 'Загрузка...';

  return (
    <section className={styles.root}>
      <SectionTitle>Дополнительно</SectionTitle>
      <ul className={styles.extras}>
        {extraServicesValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              label={servicesData[0].extraServicesData[item.id].label}
              imageUrl={servicesData[0].extraServicesData[item.id].imageUrl}
              isChecked={tariffExtraServices[item.id]}
              onChange={(isChecked) =>
                dispatch(
                  setExtraService({
                    serviceName: item.id,
                    newValue: isChecked,
                  })
                )
              }
              {...item}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

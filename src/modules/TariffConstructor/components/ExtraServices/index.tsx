import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfig, selectExtraServices } from '../../store/selectors';
import { setExtraService } from '../../store/slice';
import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';
import styles from './ExtraServices.module.scss';
import { selectServicesData } from '../../../../store/servicesData/selectors';

export const ExtraServices: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);
  const { extraServicesData } = useSelector(selectServicesData);
  const tariffExtraServices = useSelector(selectExtraServices);
  const extraServicesValuesArray = Object.values(config.extraServices);

  return (
    <section className={styles.root}>
      <SectionTitle>Дополнительно</SectionTitle>
      <ul className={styles.extras}>
        {extraServicesValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              label={extraServicesData[item.id].label}
              imageUrl={extraServicesData[item.id].imageUrl}
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

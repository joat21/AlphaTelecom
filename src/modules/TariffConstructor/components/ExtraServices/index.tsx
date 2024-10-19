import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfig, selectExtraServices } from '../../store/selectors';
import { setExtraService } from '../../store/slice';
import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';
import styles from './ExtraServices.module.scss';

export const ExtraServices: FC = () => {
  const dispatch = useDispatch();
  const extraServices = useSelector(selectExtraServices);
  const config = useSelector(selectConfig);
  const extraServicesValuesArray = Object.values(config.extraServices);

  const iconMap: Record<string, string> = {
    intercityCalls: './src/assets/img/services/intercityCalls.svg',
  };

  return (
    <section className={styles.root}>
      <SectionTitle>Дополнительно</SectionTitle>
      <ul className={styles.extras}>
        {extraServicesValuesArray.map((item) => (
          <li key={item.id}>
            <ServiceToggle
              imageUrl={iconMap[item.id]}
              isChecked={extraServices[item.id]}
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

import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfig, selectExtraServices } from '../../store/selectors';
import { setIntercityCalls } from '../../store/slice';
import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';
import styles from './ExtraServices.module.scss';

export const ExtraServices: FC = () => {
  const dispatch = useDispatch();
  const { intercityCalls } = useSelector(selectExtraServices);

  const config = useSelector(selectConfig);
  const extraServicesValuesArray = Object.values(config[0].extraServices);

  const actionMap: Record<string, (isChecked: boolean) => void> = {
    intercityCalls: (isChecked) => dispatch(setIntercityCalls(isChecked)),
  };

  const isCheckedMap: Record<string, boolean> = {
    intercityCalls: intercityCalls,
  };

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
              id={item.id}
              label={item.label}
              imageUrl={iconMap[item.id]}
              price={item.price}
              isChecked={isCheckedMap[item.id]}
              onChange={(isChecked) => actionMap[item.id](isChecked)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

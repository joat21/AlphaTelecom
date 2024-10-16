import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectExtraServices, setIntercityCalls } from '../../store/slice';
import { SectionTitle } from '../SectionTitle';
import ServiceToggle from '../ServiceToggle';
import styles from './ExtraServices.module.scss';

export const ExtraServices: FC = () => {
  const dispatch = useDispatch();
  const { intercityCalls } = useSelector(selectExtraServices);
  return (
    <section className={styles.root}>
      <SectionTitle>Дополнительно</SectionTitle>
      <ul className={styles.extras}>
        <li>
          <ServiceToggle
            id="intercityCalls"
            label="Междугородние звонки"
            imageUrl="./src/assets/img/services/intercityCalls.svg"
            price={60}
            isChecked={intercityCalls}
            onChange={(isChecked) => dispatch(setIntercityCalls(isChecked))}
          />
        </li>
      </ul>
    </section>
  );
};

import { FC } from 'react';
import { BasicServices } from '../../entities/model';
import styles from './BasicServicesList.module.scss';

interface BasicServicesListProps extends BasicServices {}

export const BasicServicesList: FC<BasicServicesListProps> = ({
  internet,
  minutes,
  sms,
}) => {
  return (
    <ul className={styles['basic-services']}>
      <li>{internet} гб</li>
      <li>{minutes} мин.</li>
      <li>{sms} sms</li>
    </ul>
  );
};

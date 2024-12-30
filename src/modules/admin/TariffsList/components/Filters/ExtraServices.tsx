import { FC } from 'react';
import { FiltersGroupProps } from '.';
import styles from './Filters.module.scss';
import { ServiceToggle } from '../ServiceToggle';

export const ExtraServices: FC<FiltersGroupProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className={styles['filters-group']}>
      <span>Дополнительно</span>
      <ServiceToggle
        name="intercityCalls"
        checked={!!filters.intercityCalls}
        label="Междугородние звонки"
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

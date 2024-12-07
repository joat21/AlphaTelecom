import { FC } from 'react';
import { Checkbox } from '@UI';
import { FiltersGroupProps } from '.';
import styles from './Filters.module.scss';

export const ExtraServices: FC<FiltersGroupProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className={styles['filters-group']}>
      <span>Дополнительно</span>
      <Checkbox
        name="intercityCalls"
        checked={!!filters.intercityCalls}
        label="Междугородние звонки"
        onChange={(e) => onFilterChange('intercityCalls', e.target.checked)}
      />
    </div>
  );
};

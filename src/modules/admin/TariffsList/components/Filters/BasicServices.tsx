import { FC } from 'react';
import { Input } from '@UI';
import { FiltersGroupProps } from '.';
import styles from './Filters.module.scss';

export const BasicServices: FC<FiltersGroupProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className={styles['filters-group']}>
      <span>Основное</span>
      <Input
        name="internet"
        value={filters.internet || ''}
        onChange={(e) => onFilterChange('internet', e.target.value)}
        placeholder="Интернет"
        variant="secondary"
      />
      <Input
        name="minutes"
        value={filters.minutes || ''}
        onChange={(e) => onFilterChange('minutes', e.target.value)}
        placeholder="Минуты"
        variant="secondary"
      />
      <Input
        name="sms"
        value={filters.sms || ''}
        onChange={(e) => onFilterChange('sms', e.target.value)}
        placeholder="SMS"
        variant="secondary"
      />
    </div>
  );
};

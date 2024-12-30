import { FC } from 'react';
import { Input } from '@UI';
import { FiltersGroupProps } from '.';
import styles from './Filters.module.scss';
import { StatusController } from '../StatusController';

export const Tariff: FC<FiltersGroupProps> = ({ filters, onFilterChange }) => {
  return (
    <div className={styles['filters-group']}>
      <span>Тариф</span>
      <Input
        name="title"
        value={filters.title || ''}
        onChange={(e) => onFilterChange('title', e.target.value)}
        placeholder="Название"
        variant="secondary"
      />
      <StatusController
        isActive={filters.isActive}
        onFilterChange={onFilterChange}
      />
      <Input
        name="price"
        value={filters.price || ''}
        onChange={(e) => onFilterChange('price', e.target.value)}
        placeholder="Цена"
        variant="secondary"
      />
    </div>
  );
};

import { FC } from 'react';
import { Input, Radio } from '@UI';
import { FiltersGroupProps } from '.';
import styles from './Filters.module.scss';

const options = [
  { label: 'Активен', value: true },
  { label: 'В архиве', value: false },
];

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
      <Input
        name="price"
        value={filters.price || ''}
        onChange={(e) => onFilterChange('price', e.target.value)}
        placeholder="Цена"
        variant="secondary"
      />
      <Radio.Group
        name="isActive"
        options={options}
        onChange={(e) => {
          console.log(e.target.value);
          onFilterChange('isActive', e.target.value);
        }}
        style={{ alignSelf: 'center' }}
      />
    </div>
  );
};

import { FC, useState } from 'react';
import { Block, Button, Input } from '@UI';
import { GetClientsUrlParams } from '@services/clientsApi';
import styles from './Filters.module.scss';

interface FiltersProps {
  setUrlParams: (params: GetClientsUrlParams) => void;
}

export const Filters: FC<FiltersProps> = ({ setUrlParams }) => {
  const [filters, setFilters] = useState<GetClientsUrlParams>({});

  const onFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const onSearch = () => {
    setUrlParams(filters);
  };

  const onClearFilters = () => {
    setFilters({
      surname: '',
      name: '',
      patronymic: '',
      phone: '',
      contractNumber: '',
      tariffId: '',
    });
    setUrlParams({});
  };

  return (
    <Block className={styles.block}>
      <Input
        name="surname"
        value={filters.surname || ''}
        onChange={(e) => onFilterChange('surname', e.target.value)}
        placeholder="Фамилия"
        variant="secondary"
      />
      <Input
        name="name"
        value={filters.name || ''}
        onChange={(e) => onFilterChange('name', e.target.value)}
        placeholder="Имя"
        variant="secondary"
      />
      <Input
        name="patronymic"
        value={filters.patronymic || ''}
        onChange={(e) => onFilterChange('patronymic', e.target.value)}
        placeholder="Отчество"
        variant="secondary"
      />
      <Input
        name="phone"
        value={filters.phone || ''}
        onChange={(e) => onFilterChange('phone', e.target.value)}
        placeholder="Номер телефона"
        variant="secondary"
      />
      <Input
        name="tariffId"
        value={filters.tariffId || ''}
        onChange={(e) => onFilterChange('tariffId', e.target.value)}
        placeholder="ID тарифа"
        variant="secondary"
      />
      <Input
        name="contractNumber"
        value={filters.contractNumber || ''}
        onChange={(e) => onFilterChange('contractNumber', e.target.value)}
        placeholder="Номер договора"
        variant="secondary"
      />
      <Button className={styles.btn} onClick={onSearch}>
        Применить
      </Button>
      <Button
        className={styles.btn}
        onClick={onClearFilters}
        variant="secondary"
      >
        Очистить
      </Button>
    </Block>
  );
};

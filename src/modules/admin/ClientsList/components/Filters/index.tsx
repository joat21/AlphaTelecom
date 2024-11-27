import { Block, Button, Input } from '@UI';
import { FC, useState } from 'react';
import styles from './Filters.module.scss';
import { GetClientsUrlParams } from '@services/clientsApi';

interface FiltersProps {
  setUrlParams: (params: GetClientsUrlParams) => void;
}

export const Filters: FC<FiltersProps> = ({ setUrlParams }) => {
  const [filters, setFilters] = useState<GetClientsUrlParams>({});

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    console.log(filters);
    setUrlParams(filters);
  };

  const handleClearFilters = () => {
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
        value={filters.surname || ''}
        onChange={(e) => handleFilterChange('surname', e.target.value)}
        placeholder="Фамилия"
      />
      <Input
        value={filters.name || ''}
        onChange={(e) => handleFilterChange('name', e.target.value)}
        placeholder="Имя"
      />
      <Input
        value={filters.patronymic || ''}
        onChange={(e) => handleFilterChange('patronymic', e.target.value)}
        placeholder="Отчество"
      />
      <Input
        value={filters.phone || ''}
        onChange={(e) => handleFilterChange('phone', e.target.value)}
        placeholder="Номер телефона"
      />
      <Input
        value={filters.tariffId || ''}
        onChange={(e) => handleFilterChange('tariffId', e.target.value)}
        placeholder="ID тарифа"
      />
      <Input
        value={filters.contractNumber || ''}
        onChange={(e) => handleFilterChange('contractNumber', e.target.value)}
        placeholder="Номер договора"
      />
      <Button onClick={handleSearch}>Применить</Button>
      <Button onClick={handleClearFilters}>Очистить</Button>
    </Block>
  );
};

import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Block, Button } from '@UI';
import { Tariff } from './Tariff';

import { GetTariffsUrlParams } from '@services/tariffsApi';
import { ROUTES } from '@constants/routes';

import styles from './Filters.module.scss';
import { BasicServices } from './BasicServices';
import { UnlimitedTraffic } from './UnlimitedTraffic';
import { ExtraServices } from './ExtraServices';

interface FiltersProps {
  setUrlParams: Dispatch<SetStateAction<GetTariffsUrlParams>>;
}

export interface FiltersGroupProps {
  filters: GetTariffsUrlParams;
  onFilterChange: (
    field: keyof GetTariffsUrlParams,
    value: string | boolean
  ) => void;
}

export const Filters: FC<FiltersProps> = ({ setUrlParams }) => {
  const [filters, setFilters] = useState<GetTariffsUrlParams>({});

  const onFilterChange = (
    field: keyof typeof filters,
    value: string | boolean
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const onSearch = () => {
    setUrlParams(filters);
  };

  const onClearFilters = () => {
    setFilters({});
    setUrlParams({});
  };

  return (
    <Block className={styles.block}>
      <Tariff filters={filters} onFilterChange={onFilterChange} />
      <BasicServices filters={filters} onFilterChange={onFilterChange} />
      <UnlimitedTraffic filters={filters} onFilterChange={onFilterChange} />
      <ExtraServices filters={filters} onFilterChange={onFilterChange} />

      <div className={styles.btns}>
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
        <Button
          className={styles.btn}
          to={'/admin/' + ROUTES.ADMIN.TARIFF_CONSTRUCTOR}
        >
          Создать тариф
        </Button>
      </div>
    </Block>
  );
};

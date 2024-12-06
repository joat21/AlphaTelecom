import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Block, Button, Checkbox, Input, Radio } from '@UI';
import { GetTariffsUrlParams } from '@services/tariffsApi';
import styles from './Filters.module.scss';

const options = [
  { label: 'Активен', value: true },
  { label: 'В архиве', value: false },
];

interface FiltersProps {
  setUrlParams: Dispatch<SetStateAction<GetTariffsUrlParams>>;
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
        />
      </div>
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
      <div className={styles['filters-group']}>
        <span>Безлимиты</span>
        <Checkbox
          name="unlimitedSocials"
          checked={!!filters.unlimitedSocials}
          label="Соцсети"
          onChange={(e) => {
            onFilterChange('unlimitedSocials', e.target.checked);
          }}
        />
        <Checkbox
          name="unlimitedVideo"
          checked={!!filters.unlimitedVideo}
          label="Видео"
          onChange={(e) => onFilterChange('unlimitedVideo', e.target.checked)}
        />
        <Checkbox
          name="unlimitedMusic"
          checked={!!filters.unlimitedMusic}
          label="Музыка"
          onChange={(e) => onFilterChange('unlimitedMusic', e.target.checked)}
        />
      </div>
      <div className={styles['filters-group']}>
        <span>Дополнительно</span>
        <Checkbox
          name="intercityCalls"
          checked={!!filters.intercityCalls}
          label="Междугородние звонки"
          onChange={(e) => onFilterChange('intercityCalls', e.target.checked)}
        />
      </div>
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

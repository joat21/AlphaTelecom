import { FC } from 'react';
import { FiltersGroupProps } from '.';
import styles from './Filters.module.scss';
import { ServiceToggle } from '../ServiceToggle';

export const UnlimitedTraffic: FC<FiltersGroupProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className={styles['filters-group']}>
      <span>Безлимиты</span>
      <ServiceToggle
        name="unlimitedSocials"
        checked={!!filters.unlimitedSocials}
        label="Соцсети"
        onFilterChange={onFilterChange}
      />
      <ServiceToggle
        name="unlimitedVideo"
        checked={!!filters.unlimitedVideo}
        label="Видео"
        onFilterChange={onFilterChange}
      />
      <ServiceToggle
        name="unlimitedMusic"
        checked={!!filters.unlimitedMusic}
        label="Музыка"
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

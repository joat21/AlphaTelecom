import { FC } from 'react';
import { Checkbox } from '@UI';
import { FiltersGroupProps } from '.';
import styles from './Filters.module.scss';

export const UnlimitedTraffic: FC<FiltersGroupProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
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
  );
};

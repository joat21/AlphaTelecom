import { Button } from '@UI';
import styles from './StatusController.module.scss';
import { FC } from 'react';
import { GetTariffsUrlParams } from '@services/tariffsApi';

export interface StatusControllerProps {
  isActive?: boolean;
  onFilterChange: (
    field: keyof GetTariffsUrlParams,
    value: string | boolean
  ) => void;
}

export const StatusController: FC<StatusControllerProps> = ({
  isActive,
  onFilterChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <Button
        variant={isActive ? 'primary' : 'secondary'}
        onClick={() => onFilterChange('isActive', true)}
      >
        Активен
      </Button>
      <Button
        variant={isActive || isActive === undefined ? 'secondary' : 'primary'}
        onClick={() => onFilterChange('isActive', false)}
      >
        В архиве
      </Button>
    </div>
  );
};

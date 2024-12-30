import { FC } from 'react';
import { Button } from '@UI';
import { GetTariffsUrlParams } from '@services/tariffsApi';

interface ServiceToggleProps {
  name: keyof GetTariffsUrlParams;
  checked: boolean;
  label: string;
  onFilterChange: (
    field: keyof GetTariffsUrlParams,
    value: string | boolean
  ) => void;
}

export const ServiceToggle: FC<ServiceToggleProps> = ({
  name,
  checked,
  label,
  onFilterChange,
}) => {
  return (
    <Button
      name={name}
      variant={checked ? 'primary' : 'secondary'}
      onClick={() => onFilterChange(name, !checked)}
    >
      {label}
    </Button>
  );
};

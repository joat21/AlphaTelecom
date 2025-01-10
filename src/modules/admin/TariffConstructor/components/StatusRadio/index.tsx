import { FC } from 'react';
import { ButtonRadio } from '@UI';

const options = [
  { label: 'Активен', value: 'Активен' },
  { label: 'В архиве', value: 'В архиве' },
];

interface StatusRadioProps {
  isActive: boolean;
  onChange: (value: string) => void;
}

export const StatusRadio: FC<StatusRadioProps> = ({ isActive, onChange }) => {
  return (
    <div>
      <span>Статус</span>
      <ButtonRadio
        name="status"
        options={options}
        value={isActive ? 'Активен' : 'В архиве'}
        onChange={onChange}
      />
    </div>
  );
};

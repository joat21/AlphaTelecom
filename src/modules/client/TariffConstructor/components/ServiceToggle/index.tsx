import { FC } from 'react';
import { Block, ToggleSwitch } from '@UI';
import styles from './ServiceToggle.module.scss';

interface ServiceToggleProps {
  price: number;
  id: string;
  label: string;
  imageUrl?: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
}

const ServiceToggle: FC<ServiceToggleProps> = ({
  price,
  id,
  label,
  imageUrl,
  isChecked,
  onChange,
}) => {
  return (
    <Block className={styles.root}>
      <span>{label}</span>
      {imageUrl && <img src={imageUrl} className={styles.icon} alt={label} />}
      <div className={styles.bottom}>
        <span className={styles.price}>{price} руб.</span>
        <ToggleSwitch
          id={`${id}-toggle`}
          name={id}
          label={label}
          isChecked={isChecked}
          onChange={onChange}
        />
      </div>
    </Block>
  );
};

export default ServiceToggle;

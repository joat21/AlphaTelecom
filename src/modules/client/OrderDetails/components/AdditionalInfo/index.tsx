import { FC } from 'react';
import { Block } from '@UI';
import styles from './AdditionalInfo.module.scss';
import { formatDate } from 'helpers';

export const AdditionalInfo: FC = () => {
  const nextDay = new Date();
  nextDay.setDate(new Date().getDate() + 1);

  return (
    <Block className={styles.wrapper}>
      <h3>Место получения:</h3>
      <span className={styles.info}>
        <span>г. Екатеринбург, ул. Пушкина, 69.</span>
        <span>Вы можете посетить офис с {formatDate(nextDay)}.</span>
        <span>График работы: ПН-ПТ, 10:00-20:00.</span>
      </span>
    </Block>
  );
};

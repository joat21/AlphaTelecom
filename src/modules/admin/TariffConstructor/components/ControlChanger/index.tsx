import { FC } from 'react';
import { Button } from '@UI';
import { Tooltip } from 'antd';
import dropdownArrow from '@assets/img/dropdown-arrow.svg';
import textCursor from '@assets/img/text-cursor.svg';
import styles from './ControlChanger.module.scss';

interface ControlChangerProps {
  isSelect: boolean;
  setIsSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ControlChanger: FC<ControlChangerProps> = ({
  isSelect,
  setIsSelect,
}) => {
  return (
    <Tooltip
      mouseEnterDelay={0.5}
      mouseLeaveDelay={0}
      title={isSelect ? 'Ввести вручную' : 'Выбрать из списка'}
    >
      {/* Tooltip выбрасывает варн: findDOMNode is deprecated. Решается оборачиваением компонента-триггера в другой тег */}
      <span className={styles.wrapper}>
        <Button
          className={styles.btn}
          onClick={() => setIsSelect((prev) => !prev)}
        >
          <img
            src={isSelect ? textCursor : dropdownArrow}
            alt={isSelect ? 'Ввести' : 'Выбрать'}
            width={25}
            height={25}
          />
        </Button>
      </span>
    </Tooltip>
  );
};

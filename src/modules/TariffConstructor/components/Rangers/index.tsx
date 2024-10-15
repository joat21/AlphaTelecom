import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Block, InputRange } from '../../../../UI';

import {
  fetchConstructorConfig,
  selectConfig,
  setInternet,
  setMinutes,
  setSms,
} from '../../store/slice';

import styles from './Rangers.module.scss';

export const Rangers: FC = () => {
  const dispatch = useDispatch();
  const config = useSelector(selectConfig);

  const actionMap: Record<string, (value: number) => void> = {
    internet: (value) => dispatch(setInternet(value)),
    minutes: (value) => dispatch(setMinutes(value)),
    sms: (value) => dispatch(setSms(value)),
  };

  useEffect(() => {
    dispatch(fetchConstructorConfig());
  }, []);

  return (
    <ul className={styles.rangers}>
      {config.map((item) => (
        <li key={item.id}>
          <Block style={{ padding: '40px 45px' }}>
            <InputRange
              id={item.id}
              label={item.label}
              datalist={item.values}
              onChange={(value) => actionMap[item.id](value)}
            />
          </Block>
        </li>
      ))}
    </ul>
  );
};

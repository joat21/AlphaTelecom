import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Block, InputRange } from '../../../../UI';

import { setInternet, setMinutes, setSms } from '../../store/slice';

import styles from './Rangers.module.scss';

export const Rangers: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.rangers}>
      <Block style={{ padding: '40px 45px' }}>
        <InputRange
          id="internetRange"
          label="Интернет"
          name="internet"
          datalist={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
          onChange={(value) => dispatch(setInternet(value))}
        />
      </Block>
      <Block style={{ padding: '40px 45px' }}>
        <InputRange
          id="minutesRange"
          label="Минуты"
          name="minutes"
          datalist={[250, 350, 500, 700, 900, 1500, 2000]}
          onChange={(value) => dispatch(setMinutes(value))}
        />
      </Block>
      <Block style={{ padding: '40px 45px' }}>
        <InputRange
          id="smsRange"
          label="SMS"
          name="sms"
          datalist={[50, 100, 200, 300, 400, 500]}
          onChange={(value) => dispatch(setSms(value))}
        />
      </Block>
    </div>
  );
};

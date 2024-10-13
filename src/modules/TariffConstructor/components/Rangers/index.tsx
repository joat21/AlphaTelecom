import { FC } from 'react';
import { Block, InputRange } from '../../../../UI';
import styles from './Rangers.module.scss';

export const Rangers: FC = ({ services, setServices }) => {
  return (
    <div className={styles.rangers}>
      <Block>
        <InputRange
          id="internetRange"
          label="Интернет"
          name="internet"
          datalist={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
          onChange={(value) => setServices({ ...services, internet: value })}
        />
      </Block>
      <Block>
        <InputRange
          id="minutesRange"
          label="Минуты"
          name="minutes"
          datalist={[250, 350, 500, 700, 900, 1500, 2000]}
          onChange={(value) => setServices({ ...services, minutes: value })}
        />
      </Block>
      <Block>
        <InputRange
          id="smsRange"
          label="SMS"
          name="sms"
          datalist={[50, 100, 200, 300, 400, 500]}
          onChange={(value) => setServices({ ...services, sms: value })}
        />
      </Block>
    </div>
  );
};

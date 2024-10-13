import { FC } from 'react';
import { Block, Button } from '../../../../UI';
import styles from './TariffInfo.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { selectBasicServices, selectNoLimits } from '../../store/slice';

export const TariffInfo: FC = () => {
  const price = useSelector((state: RootState) => state.tariffConstructor.price);
  const { internet, minutes, sms } = useSelector(selectBasicServices);
  const { noLimitMusic, noLimitSocial, noLimitVideo } = useSelector(selectNoLimits);

  return (
    <Block className={styles.info}>
      <div className={styles.specs}>
        <div>
          <h3>Ваш тариф:</h3>
          <ul>
            <li>{internet} ГБ</li>
            <li>{minutes} МИН.</li>
            <li>{sms} SMS</li>
          </ul>
          {(noLimitMusic || noLimitSocial || noLimitVideo) && <span>Безлимит на:</span>}
          <ul>
            {noLimitSocial && <li>Соц. сети и мессенджеры</li>}
            {noLimitVideo && <li>Видео в соц.сетях</li>}
            {noLimitMusic && <li>Музыка</li>}
          </ul>
        </div>
        <span className={styles.price}>Итого: {price}₽/МЕС.</span>
      </div>
      <Button className={styles.btn}>Купить</Button>
    </Block>
  );
};

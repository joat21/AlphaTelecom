import { FC, useState } from 'react';
import { InputRange, Block } from '../../../../UI';

const BasicServices: FC = () => {
  const [services, setServices] = useState({
    internet: 5,
    minutes: 250,
    sms: 50,
    noLimitSocial: false,
    noLimitVideo: false,
    noLimitMusic: false,
  });

  const [price, setPrice] = useState(210);

  return (
    <section>
      <h2>Основные услуги</h2>
      <div>
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
      <Block>
        <div>
          <h3>Ваш тариф:</h3>
          <ul>
            <li>{services.internet} ГБ</li>
            <li>{services.minutes} МИН.</li>
            <li>{services.sms} SMS</li>
          </ul>
          {(services.noLimitMusic || services.noLimitSocial || services.noLimitVideo) && (
            <span>Безлимит на:</span>
          )}
          <ul>
            {services.noLimitSocial && <li>Соц. сети и мессенджеры</li>}
            {services.noLimitSocial && <li>Видео в соц.сетях</li>}
            {services.noLimitSocial && <li>Музыка</li>}
          </ul>
        </div>
        <span>Итого: {price}₽/МЕС.</span>
      </Block>
    </section>
  );
};

export default BasicServices;

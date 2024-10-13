import { FC, useState } from 'react';
import BasicServices from '../BasicServices';
import { NoLimitTraffic } from '../NoLimitTraffic';

export const TariffConstructor: FC = () => {
  const [services, setServices] = useState({
    internet: 5,
    minutes: 250,
    sms: 50,
    noLimitSocial: true,
    noLimitVideo: false,
    noLimitMusic: false,
  });

  const [price, setPrice] = useState(210);

  return (
    <div>
      <BasicServices services={services} setServices={setServices} price={price} />
      <NoLimitTraffic services={services} setServices={setServices} />
    </div>
  );
};

import { FC, useState } from 'react';
import BasicServices from '../BasicServices';
import { NoLimitTraffic } from '../NoLimitTraffic';

export const TariffConstructor: FC = () => {
  return (
    <div>
      <BasicServices />
      <NoLimitTraffic />
    </div>
  );
};

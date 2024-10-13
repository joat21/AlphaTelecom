import { FC, useState } from 'react';
import BasicServices from '../BasicServices';
import { NoLimitTraffic } from '../NoLimitTraffic';
import { ExtraServices } from '../ExtraServices';

export const TariffConstructor: FC = () => {
  return (
    <div>
      <BasicServices />
      <NoLimitTraffic />
      <ExtraServices />
    </div>
  );
};

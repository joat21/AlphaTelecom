import { FC, useState } from 'react';
import TariffsTable from '../TariffsTable';
import { GetTariffsUrlParams, useGetTariffsQuery } from '@services/tariffsApi';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { Filters } from '../Filters';

export const TariffsList: FC = () => {
  const [urlParams, setUrlParams] = useState<GetTariffsUrlParams>({});
  const { data: tariffs, isLoading: isTariffsLoading } =
    useGetTariffsQuery(urlParams);
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  if (isTariffsLoading || !tariffs || isServicesDataLoading || !servicesData)
    return 'Loading...';

  return (
    <>
      <Filters setUrlParams={setUrlParams} />
      <TariffsTable
        data={tariffs}
        servicesData={servicesData[0]}
        setUrlParams={setUrlParams}
      />
    </>
  );
};

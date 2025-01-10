import { FC, useState } from 'react';

import { Loading } from '@components/Loading';
import { Filters } from '../Filters';
import { ClientsTable } from '../ClientsTable';

import { GetClientsUrlParams, useGetClientsQuery } from '@services/clientsApi';

export const ClientsList: FC = () => {
  const [urlParams, setUrlParams] = useState<GetClientsUrlParams>({});
  const { data: clients, isLoading } = useGetClientsQuery(urlParams);

  if (isLoading || !clients) return <Loading />;

  return (
    <>
      <Filters setUrlParams={setUrlParams} />
      <ClientsTable data={clients} />
    </>
  );
};

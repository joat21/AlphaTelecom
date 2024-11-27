import { FC, useState } from 'react';
import { GetClientsUrlParams, useGetClientsQuery } from '@services/clientsApi';
import { Filters } from '../Filters';
import { ClientsTable } from '../ClientsTable';

export const ClientsList: FC = () => {
  const [urlParams, setUrlParams] = useState<GetClientsUrlParams>({});
  const { data: clients, isLoading } = useGetClientsQuery(urlParams);

  if (isLoading || !clients) return 'Loading...';

  return (
    <>
      <Filters setUrlParams={setUrlParams} />
      <ClientsTable data={clients} />
    </>
  );
};

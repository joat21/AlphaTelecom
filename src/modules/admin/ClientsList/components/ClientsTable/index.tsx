import { FC } from 'react';
import { Table, TableProps } from 'antd';
import { User } from '@services/authApi';
import { columns } from './columns';

interface ClientsTableProps {
  data: User[];
}

export const ClientsTable: FC<ClientsTableProps> = ({ data }) => {
  const onChange: TableProps<User>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Table<User>
      columns={columns}
      rowKey="id"
      dataSource={data}
      pagination={false}
      onChange={onChange}
      style={{ width: '95%' }}
    />
  );
};

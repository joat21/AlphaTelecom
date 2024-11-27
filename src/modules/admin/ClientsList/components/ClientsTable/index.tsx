import { FC, Key, useState } from 'react';
import { Table, TableProps } from 'antd';
import { User } from '@services/authApi';
import { columns } from './columns';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

interface ClientsTableProps {
  data: User[];
}

export const ClientsTable: FC<ClientsTableProps> = ({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onChange: TableProps<User>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const rowSelection: TableRowSelection<User> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <Table<User>
      rowSelection={rowSelection}
      columns={columns}
      rowKey="id"
      dataSource={data}
      pagination={false}
      onChange={onChange}
      style={{ width: '95%' }}
    />
  );
};

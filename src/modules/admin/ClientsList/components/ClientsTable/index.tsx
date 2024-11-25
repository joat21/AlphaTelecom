import { Key, useState } from 'react';

import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

import { useGetClientsQuery } from '@services/clientsApi';
import { User } from '@services/authApi';
import { Link } from 'react-router-dom';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const columns: TableColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'ФИО',
    render: (_, record) => (
      <Link to={'/admin/clients/' + record.id}>
        {record.surname} {record.name} {record.patronymic}
      </Link>
    ),
  },
  {
    title: 'Номер договора',
    dataIndex: 'contractNumber',
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
  },
  {
    title: 'Баланс, ₽',
    dataIndex: 'balance',
  },
  {
    title: 'ID тарифа',
    dataIndex: 'tariffId',
    render: (text) => <Link to={'/tariffs/' + text}>{text}</Link>,
  },
];

const ClientsTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const { data, isLoading } = useGetClientsQuery();

  if (isLoading || !data) return 'Loading...';

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
      style={{ width: '100%' }}
    />
  );
};

export default ClientsTable;

import { Link } from 'react-router-dom';
import { TableColumnsType } from 'antd';
import { User } from '@services/authApi';
import { formatPhoneNumber } from 'helpers';

export const columns: TableColumnsType<User> = [
  {
    title: 'ФИО',
    render: (_, record) => (
      <Link to={'/admin/clients' + `/${record.id}`}>
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
    render: (_, record) => formatPhoneNumber(record.phone),
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

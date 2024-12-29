import { Link } from 'react-router-dom';
import { TableColumnsType } from 'antd';
import { User } from '@services/authApi';
import { ROUTES } from '@constants/routes';

export const columns: TableColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'ФИО',
    render: (_, record) => (
      <Link to={'/admin/' + ROUTES.ADMIN.CLIENT_INFO + `/${record.id}`}>
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

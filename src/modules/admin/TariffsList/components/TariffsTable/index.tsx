import { Key, useMemo, useState } from 'react';

import { Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

import { useGetTariffsQuery } from '@services/tariffsApi';
import { useGetServicesDataQuery } from '@services/servicesConfigApi';
import { TariffWithImage } from '@entities/model';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const TariffsTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const { data, isLoading } = useGetTariffsQuery();
  const { data: servicesData, isLoading: isServicesDataLoading } =
    useGetServicesDataQuery();

  const columns: TableColumnsType<TariffWithImage> = useMemo(() => {
    if (!servicesData) return [];
    return [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: 'Название',
        dataIndex: 'title',
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        render: (_, record) =>
          record?.status === 'active' ? (
            <Tag color="green">Активен</Tag>
          ) : (
            <Tag color="red">В архиве</Tag>
          ),
      },
      {
        title: 'Цена, ₽',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        showSorterTooltip: false,
      },
      {
        title: 'Основные услуги',
        children: [
          {
            title: 'Интернет, ГБ',
            dataIndex: 'basicServices.internet',
            sorter: (a, b) =>
              a.basicServices.internet - b.basicServices.internet,
            showSorterTooltip: false,
            render: (_, record) =>
              record?.basicServices?.internet ?? 'Нет данных',
          },
          {
            title: 'Минуты, мин',
            dataIndex: 'basicServices.minutes',
            sorter: (a, b) => a.basicServices.minutes - b.basicServices.minutes,
            showSorterTooltip: false,
            render: (_, record) =>
              record?.basicServices?.minutes ?? 'Нет данных',
          },
          {
            title: 'SMS',
            dataIndex: 'basicServices.sms',
            sorter: (a, b) => a.basicServices.sms - b.basicServices.sms,
            showSorterTooltip: false,
            render: (_, record) => record?.basicServices?.sms ?? 'Нет данных',
          },
        ],
      },
      {
        title: 'Безлимиты',
        children: [
          {
            title: 'Соцсети',
            dataIndex: 'unlimitedApps.unlimitedSocials',
            render: (_, record) =>
              record?.unlimitedApps?.unlimitedSocials ? (
                <Tag color="green">Да</Tag>
              ) : (
                <Tag color="red">Нет</Tag>
              ),
          },
          {
            title: 'Видео',
            dataIndex: 'unlimitedApps.unlimitedVideo',
            render: (_, record) =>
              record?.unlimitedApps?.unlimitedVideo ? (
                <Tag color="green">Да</Tag>
              ) : (
                <Tag color="red">Нет</Tag>
              ),
          },
          {
            title: 'Музыка',
            dataIndex: 'unlimitedApps.unlimitedMusic',
            render: (_, record) =>
              record?.unlimitedApps?.unlimitedMusic ? (
                <Tag color="green">Да</Tag>
              ) : (
                <Tag color="red">Нет</Tag>
              ),
          },
        ],
      },
      {
        title: 'Доп. услуги',
        children: [
          {
            title: 'Междугородние звонки',
            dataIndex: 'extraServices.intercityCalls',
            render: (_, record) =>
              record?.extraServices?.intercityCalls ? (
                <Tag color="green">Да</Tag>
              ) : (
                <Tag color="red">Нет</Tag>
              ),
          },
        ],
      },
    ];
  }, [servicesData]);

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onChange: TableProps<TariffWithImage>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const rowSelection: TableRowSelection<TariffWithImage> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  if (isLoading || !data || isServicesDataLoading || !servicesData)
    return 'Loading...';

  return (
    <Table<TariffWithImage>
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

export default TariffsTable;

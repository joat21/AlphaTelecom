import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TableColumnsType, Tag } from 'antd';
import { ServicesDataState, TariffWithImage } from '@entities/model';
import { ROUTES } from '@constants/routes';

export const getColumns = (
  servicesData: ServicesDataState
): TableColumnsType<TariffWithImage> => {
  const columns: TableColumnsType<TariffWithImage> = useMemo(
    () => [
      {
        title: 'Название',
        dataIndex: 'title',
        render: (text, record) => (
          <Link
            to={'/admin/' + ROUTES.ADMIN.TARIFF_CONSTRUCTOR + `/${record.id}`}
          >
            {text}
          </Link>
        ),
      },
      {
        title: 'Статус',
        dataIndex: 'isActive',
        render: (_, record) =>
          record?.isActive ? (
            <Tag color="green">Активен</Tag>
          ) : (
            <Tag color="red">В архиве</Tag>
          ),
      },
      {
        title: 'Цена, ₽',
        dataIndex: 'price',
        sorter: true,
        showSorterTooltip: false,
      },
      {
        title: 'Основные услуги',
        children: [
          {
            title: 'Интернет, ГБ',
            dataIndex: 'internet',
            sorter: true,
            showSorterTooltip: false,
            render: (_, record) =>
              record?.basicServices?.internet ?? 'Нет данных',
          },
          {
            title: 'Минуты, мин',
            dataIndex: 'minutes',
            sorter: true,
            showSorterTooltip: false,
            render: (_, record) =>
              record?.basicServices?.minutes ?? 'Нет данных',
          },
          {
            title: 'SMS',
            dataIndex: 'sms',
            sorter: true,
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
            dataIndex: 'unlimitedSocials',
            render: (_, record) =>
              record?.unlimitedApps?.unlimitedSocials ? (
                <Tag color="green">Да</Tag>
              ) : (
                <Tag color="red">Нет</Tag>
              ),
          },
          {
            title: 'Видео',
            dataIndex: 'unlimitedVideo',
            render: (_, record) =>
              record?.unlimitedApps?.unlimitedVideo ? (
                <Tag color="green">Да</Tag>
              ) : (
                <Tag color="red">Нет</Tag>
              ),
          },
          {
            title: 'Музыка',
            dataIndex: 'unlimitedMusic',
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
            dataIndex: 'intercityCalls',
            render: (_, record) =>
              record?.extraServices?.intercityCalls ? (
                <Tag color="green">Да</Tag>
              ) : (
                <Tag color="red">Нет</Tag>
              ),
          },
        ],
      },
    ],
    [servicesData]
  );

  return columns;
};

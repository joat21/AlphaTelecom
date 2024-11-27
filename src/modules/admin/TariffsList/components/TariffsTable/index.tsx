import { Dispatch, FC, Key, SetStateAction, useState } from 'react';
import { Table, TableProps } from 'antd';
import { ServicesDataState, TariffWithImage } from '@entities/model';
import { GetTariffsUrlParams } from '@services/tariffsApi';
import { getColumns } from './getColumns';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

interface TariffsTableProps {
  data: TariffWithImage[];
  servicesData: ServicesDataState;
  setUrlParams: Dispatch<SetStateAction<GetTariffsUrlParams>>;
}

const TariffsTable: FC<TariffsTableProps> = ({
  data,
  servicesData,
  setUrlParams,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

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
    if (!Array.isArray(sorter)) {
      if (sorter.field) {
        const sortBy =
          sorter.order === 'ascend'
            ? sorter.field.toString()
            : '-' + sorter.field;
        setUrlParams((prev) => ({ ...prev, sortBy }));
      } else {
        setUrlParams({});
      }
    } else {
      sorter.forEach((sort) => {
        console.log(sort.field, sort.order);
      });
    }
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

  return (
    <Table<TariffWithImage>
      rowSelection={rowSelection}
      columns={getColumns(servicesData)}
      rowKey="id"
      dataSource={data}
      pagination={false}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  );
};

export default TariffsTable;

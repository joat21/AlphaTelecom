import { Dispatch, FC, SetStateAction } from 'react';
import { Table, TableProps } from 'antd';
import { ServicesDataState, TariffWithImage } from '@entities/model';
import { GetTariffsUrlParams } from '@services/tariffsApi';
import { getColumns } from './getColumns';

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
  const onChange: TableProps<TariffWithImage>['onChange'] = (
    _pagination,
    _filters,
    sorter
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

  return (
    <Table<TariffWithImage>
      columns={getColumns(servicesData)}
      rowKey="id"
      dataSource={data}
      pagination={false}
      onChange={onChange}
      style={{ width: '94%' }}
    />
  );
};

export default TariffsTable;

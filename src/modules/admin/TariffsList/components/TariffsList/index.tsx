import React, { useState } from 'react';
import { Button, Input, Space, Table } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  { key: '2', name: 'Joe Black', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Jim Green', age: 32, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Jim Red', age: 32, address: 'London No. 2 Lake Park' },
];

export const TariffsList: React.FC = () => {
  const [filteredData, setFilteredData] = useState(data);
  // Состояние для всех фильтров
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    address: '',
  });

  // Функция для обновления конкретного фильтра
  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Функция для выполнения фильтрации
  const handleSearch = () => {
    const filtered = data.filter((item) => {
      return (
        (!filters.name ||
          item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.age || item.age.toString().includes(filters.age)) &&
        (!filters.address ||
          item.address.toLowerCase().includes(filters.address.toLowerCase()))
      );
    });
    setFilteredData(filtered); // Обновление отфильтрованных данных
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <Input
          placeholder="Filter by Age"
          value={filters.age}
          onChange={(e) => handleFilterChange('age', e.target.value)}
        />
        <Input
          placeholder="Filter by Address"
          value={filters.address}
          onChange={(e) => handleFilterChange('address', e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Space>

      <Table<DataType>
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      />
    </div>
  );
};

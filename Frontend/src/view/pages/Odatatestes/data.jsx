import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://services.odata.org/V3/OData/OData.svc/Products?&$format=json'
        );
        setProducts(response.data.value);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) => {
      const searched = searchedColumn === dataIndex;

      return searched ? (
        <span>
          {text}
          <SearchOutlined style={{ color: '#1890ff', marginLeft: 5 }} />
        </span>
      ) : (
        text
      );
    },
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      ...getColumnSearchProps('Name'), // <-- Adicione a propriedade key aqui
      filteredValue: searchedColumn === 'Name' ? [searchText] : null,
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      ...getColumnSearchProps('Description'), // <-- Adicione a propriedade key aqui
      filteredValue: searchedColumn === 'Description' ? [searchText] : null,
    },
    {
      title: 'Release Date',
      dataIndex: 'ReleaseDate',
      key: 'ReleaseDate',
    },
    {
      title: 'Discontinued Date',
      dataIndex: 'DiscontinuedDate',
      key: 'DiscontinuedDate',
    },
    {
      title: 'Rating',
      dataIndex: 'Rating',
      key: 'Rating',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products Table</h1>
      <Table dataSource={products} columns={columns} rowKey="ID"/>
    </div>
  );
};

export default App;

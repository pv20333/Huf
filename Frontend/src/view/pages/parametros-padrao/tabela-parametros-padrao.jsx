import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import Switch from "./switch.jsx";
import { useHistory } from 'react-router-dom';


const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8080/api/listarpp/parametros_padrao'); // Adicione o endereço do seu servidor aqui
      setData(result.data.map((item, index) => ({
        key: index,
        n_ParametroPadrao: item.n_ParametroPadrao,
        descricao: item.descricao,
        historico_estados: item.Historico_Estados ? item.Historico_Estados.map(estado => estado.n_Estados).join(', ') : '',

      })));
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleRowClick = (record) => {
    history.push(`/pages/parametrospadrao/detalhes/${record.n_ParametroPadrao}`);
  };


  const columns = [
    {
      title: 'n_ParametroPadrao',
      dataIndex: 'n_ParametroPadrao',
      key: 'n_ParametroPadrao',
      ...getColumnSearchProps('n_ParametroPadrao'),
      render: (text, record) => (
        <a onClick={() => handleRowClick(record)}>
          {text}
        </a>
      )
    },
    {
      title: 'descricao',
      dataIndex: 'descricao',
      key: 'descricao',
      ...getColumnSearchProps('descricao'),
    },
    {
      title: 'historico_estados',
      dataIndex: 'historico_estados',
      key: 'historico_estados',
      ...getColumnSearchProps('historico_estados'),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <Switch />,
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default App;

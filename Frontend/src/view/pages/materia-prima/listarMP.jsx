import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('http://localhost:8080/api/listarppForm/ListMP');
        // Adicionando uma propriedade 'key' a cada item e renomeando n_MateriaPrima para ID.
        const dataWithKeys = result.data.map(item => ({
          ...item,
          ID: item.n_MateriaPrima,
          key: item.n_MateriaPrima
        }));
        setData(dataWithKeys);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Description',
      dataIndex: 'Descricao',
      key: 'Descricao',
    }
  ];

  return (
    <Table dataSource={data} columns={columns} />
  );
}

export default App;

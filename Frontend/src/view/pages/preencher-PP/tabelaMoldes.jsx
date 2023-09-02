import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'ID',
    dataIndex: 'n_Molde',  // Assumindo que esta é a chave correta retornada do backend
  },
  {
    title: 'Molde',
    dataIndex: 'Descricao',
  },
];

const App = (show) => {
  const [moldData, setMoldData] = useState([]);

  useEffect(() => {
    // Pegar o ID do molde da URL
    const urlParams = new URLSearchParams(window.location.search);
    const moldId = urlParams.get('molde');

    if (moldId) {
      // Fazer a requisição para o servidor usando o ID do molde
      axios.get(`http://localhost:8080/api/listarppForm/details/molde?molde=${moldId}`)
        .then(response => {
          console.log("Data:", response.data);

          if (typeof response.data === "object" && response.data !== null) {
            const moldInfo = response.data;
            moldInfo.key = moldInfo.n_Molde; // Assumindo que 'n_Molde' é o nome correto do campo ID
            setMoldData([moldInfo]);
          } else {
            console.error("Data recebida não é um objeto:", response.data);
          }
        })
        .catch(error => {
          console.log("Erro na solicitação:", error);
          if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              console.log(error.request);
          } else {
              console.log('Error', error.message);
          }
        });
    }
  }, []);

  return (
    <>
    {
      show.show ? <Table columns={columns} dataSource={moldData} size="small" pagination={false} /> : <></>
    }
  </>
  );
};

export default App;

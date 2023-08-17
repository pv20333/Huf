import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'ID',
    dataIndex: 'n_Maquina',
  },
  {
    title: 'Brand/Model',
    dataIndex: 'MarcaModelo',
  },
  {
    title: 'Closure Force',
    dataIndex: 'ForcaFecho',
  },
  {
    title: 'Spindle Diameter',
    dataIndex: 'DiametroFuso',
  },
];

const App = (show) => {
  const [machineData, setMachineData] = useState([]);

  

  useEffect(() => {
    // Pegar o ID da máquina da URL
    const urlParams = new URLSearchParams(window.location.search);
    const machineId = urlParams.get('maquina');

    if (machineId) {
      // Fazer a requisição para o servidor usando o ID da máquina
      axios.get(`http://localhost:8080/api/listarppForm/details/maquina?maquina=${machineId}`)
        .then(response => {
          console.log("Data:", response.data);

          if (typeof response.data === "object" && response.data !== null) {
            const machineInfo = response.data;
            machineInfo.key = machineInfo.n_Maquina;
            setMachineData([machineInfo]);
          } else {
            console.error("Data recebida não é um objeto:", response.data);
          }
        })
        .catch(error => {
          console.log("Erro na solicitação:", error);
          if (error.response) {
              // O pedido foi feito e o servidor respondeu com um status fora do intervalo de 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              // O pedido foi feito, mas nenhuma resposta foi recebida
              console.log(error.request);
          } else {
              // Alguma coisa aconteceu na configuração da solicitação e gerou um erro
              console.log('Error', error.message);
          }
        });
    }
  }, []);
  console.log(show)
  return (
    <>
      {
        show.show ? <Table columns={columns} dataSource={machineData} size="small" pagination={false} /> : <></>
      }
    </>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'ID',
    dataIndex: 'n_MateriaPrima',  // Supondo que é esse o nome correto, ajuste conforme necessário
  },
  {
    title: 'Row Material',
    dataIndex: 'Descricao',  // Supondo que é esse o nome correto, ajuste conforme necessário
  },
];

const App = (show) => {
  const [materiaPrimaData, setMateriaPrimaData] = useState([]);

  useEffect(() => {
    // Pegar o ID da matéria-prima da URL
    const urlParams = new URLSearchParams(window.location.search);
    const materiaPrimaId = urlParams.get('materiaPrima');

    if (materiaPrimaId) {
      // Fazer a requisição para o servidor usando o ID da matéria-prima
      axios.get(`http://localhost:8080/api/listarppForm/details/materiaPrima?materiaPrima=${materiaPrimaId}`)
        .then(response => {
          if (typeof response.data === "object" && response.data !== null) {
            const materiaPrimaInfo = response.data;
            materiaPrimaInfo.key = materiaPrimaInfo.n_MateriaPrima;
            setMateriaPrimaData([materiaPrimaInfo]);
          } else {
            console.error("Data recebida não é um objeto:", response.data);
          }
        })
        .catch(error => {
          console.log("Erro na solicitação:", error);
        });
    }
  }, []);

  return ( 
    <>
    {
      show.show ? <Table columns={columns} dataSource={materiaPrimaData} size="small" pagination={false} /> : <></>
    }
  </>
  );
};

export default App;

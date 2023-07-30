import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'antd';
import EditableTable from 'antd-editabletable';




const Detalhes = () => {
  const { n_ParametroPadrao } = useParams();
  const [parametroPadrao, setParametroPadrao] = useState(null);
  const [n_Estados, setNEstados] = useState(null);
  const [tableData, setTableData] = useState({});
  const [tabelaRespostas, setTabelaRespostas] = useState({});

  const handleInputChange = (columnKey, tableIndex, rowIndex) => (
    e
  ) => {
    const newData = {...tabelaRespostas}; // Copia a tabela de respostas
    
    // Atualiza a resposta no objeto
    if(!newData[tableIndex]) newData[tableIndex] = {};
    if(!newData[tableIndex][rowIndex]) newData[tableIndex][rowIndex] = {};
    newData[tableIndex][rowIndex][columnKey] = e.target.value;

    setTabelaRespostas(newData); // Atualiza o estado da tabela de respostas
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/renderizarpp/parametroPadraoDetalhado/${n_ParametroPadrao}`, { cancelToken: source.token });
        setParametroPadrao(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Solicitação cancelada', error.message);
        } else {
          console.error("Erro ao buscar detalhes do ParametroPadrao: ", error);
        }
      }
    };
    fetchData();

    return () => {
      source.cancel();
    };
  }, [n_ParametroPadrao]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchNEstados = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/renderizarpp/parametroPadrao/${n_ParametroPadrao}`, { cancelToken: source.token });
        setNEstados(response.data.Historico_Estados[0]?.n_Estados);
        
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Solicitação cancelada', error.message);
        } else {
          console.error("Erro ao buscar n_Estados: ", error);
        }
      }
    };
    fetchNEstados();

    return () => {
      source.cancel();
    };
  }, [n_ParametroPadrao]);

  let tabelas = {};

  if (parametroPadrao) {
    for (const resposta of parametroPadrao.TabelaRespostas) {
      const idTabela = resposta.TabelaColuna.n_TabelaGeral;
      
      if (!tabelas[idTabela]) {
        tabelas[idTabela] = {
          designacao: resposta.TabelaColuna.TabelaGeral.designacao,
          numero_linhas: resposta.TabelaColuna.TabelaGeral.numero_linhas,
          colunas: new Set(),
          linhas: Array(resposta.TabelaColuna.TabelaGeral.numero_linhas).fill().map((_, i) => ({
            key: i + 1,
          })),
          ids: new Set(),
        };
      }
  
      tabelas[idTabela].colunas.add(resposta.TabelaColuna.TituloColunas);
  
      tabelas[idTabela].ids[`ncoluna${resposta.TabelaColuna.n_TabelaColunas}`] = resposta.TabelaColuna.n_TabelaColunas;

      // Procuramos a primeira linha disponível onde a coluna ainda não está preenchida
      const linha = tabelas[idTabela].linhas.find(linha => !linha[resposta.TabelaColuna.TituloColunas]);
  
      if (linha) {
        // Adicionamos a resposta na coluna da linha encontrada
        linha[resposta.TabelaColuna.TituloColunas] = resposta.respostas;
      }
    }
  }
  

  console.log(tabelas);

  const handleCellChange = (key, dataIndex, value) => {
    setTableData((prevTableData) => {
      const newData = { ...prevTableData };
      newData[key][dataIndex] = value;
      return newData;
    });
  };


  const handleClickDeviated = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/renderizarpp/parametroPadraoDeviated/${n_ParametroPadrao}`);
      console.log(response.data);
      setNEstados(9);
    } catch (error) {
      console.error("Erro ao alterar o estado: ", error);
    }
};

const handleClickDeviatedtoSaved = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/api/renderizarpp/parametroPadraoDeviatedtoSaved/${n_ParametroPadrao}`);
    console.log(response.data);
    setNEstados(3);
  } catch (error) {
    console.error("Erro ao alterar o estado: ", error);
  }
};

const handleSave = async (n_TabelaColunas, respostas) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/renderizarpp/parametroPadraoRespostas/${n_ParametroPadrao}`, {
      n_TabelaColunas,
      respostas
    });
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao adicionar respostas: ", error);
  }
};

const updateRespostas = async () => {
  try {
    for (const [key, data] of Object.entries(tableData)) {
      const response = await axios.put(
        `http://localhost:8080/api/renderizarpp/parametroPadraoRespostas/${n_ParametroPadrao}`,
        {
          n_TabelaColunas: key,
          respostas: data,
        }
      );
      console.log(response.data);
    }
  } catch (error) {
    console.error("Erro ao atualizar respostas: ", error);
  }
};

  const renderButtons = (n_Estados) => {
    switch (n_Estados) {
      case 3:
        return (
          <>
            <Button type="primary">Submited</Button>
            <Button>Cancel</Button>
            <Button onClick={handleGuardar}>Guardar</Button>
          </>
        );
      case 4:
        return (
          <>
            <Button type="primary" onClick={handleClickDeviated}>
              Deviated
            </Button>
            <Button>Activated</Button>
          </>
        );
      case 9:
        return (
          <>
            <Button type="primary" onClick={handleClickDeviatedtoSaved}>Return to saved</Button>
            <Button>Reject</Button>
          </>
        );
      default:
        return null;
    }
  };

  function penis(){
    console.log("Executing Penis")
    Object.keys(tableData).forEach((tableIndex) => {
      const n_TabelaRespostas = Number(tableIndex);
      console.log(n_TabelaRespostas)
      console.log(tableIndex)
    })
  }

  const handleGuardar = () => {

    console.log(tabelas)
  
    axios
      .put(`http://localhost:8080/api/renderizarpp/parametroPadraoRespostas/${n_ParametroPadrao}`, {id: n_ParametroPadrao, tabelas: tabelas})
      .then((res) => {
        console.log(res);
       
      })
      .catch((error) => {
        console.error("Erro ao guardar", error);
      });
  };

  return (
    <div>
      <button onclick="penis()">Click</button>
      <button onClick={penis}>
  Activate Lasers
</button>
    {parametroPadrao ? (
      <>
        Detalhes para o parametro padrao: {n_ParametroPadrao}
        <p>Descrição: {parametroPadrao.descricao}</p>
        <p>Estados:</p>
        {Object.entries(tabelas).map(([key, tabela]) => (
  <div key={key}>
        {console.log(tabela.linhas)}
    <h2>{tabela.designacao}</h2>
    {n_Estados === 3 ? (
      <EditableTable
        columns={Array.from(tabela.colunas).map((coluna) => ({
          title: coluna,
          dataIndex: coluna,
          key: coluna,
        }))}
        dataSource={tabela.linhas}
        pagination={false}
        editable={true}
        onChange={(newData) => {
          console.log(tabela)
          console.log(tabelas)
        }}
      />
    ) : (
      <Table
        rowKey={(record) => record.key}
        columns={Array.from(tabela.colunas).map((coluna) => ({
          title: coluna,
          dataIndex: coluna,
          key: coluna,
        }))}
        dataSource={tabela.linhas}
        pagination={false}
      />
    )}
  </div>
))}
        <p>n_Formulario: {parametroPadrao.n_Formularios}</p>
        <p>n_VersaoFormulario: {parametroPadrao.n_VersaoFormulario}</p>
        {renderButtons(n_Estados)}
      </>
    ) : (
      <p>A carregar...</p>
    )}
  </div>
);
};

export default Detalhes;

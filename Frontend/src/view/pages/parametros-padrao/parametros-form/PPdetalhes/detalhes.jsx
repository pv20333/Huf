import { useEffect, useState, useRef,   } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Modal, Input } from 'antd';
import EditableTable from 'antd-editabletable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { isIT, isQuality, isCollaborator } from '../../../../components/hooks/hasPermissions';




const Detalhes = () => {
  const { n_ParametroPadrao } = useParams();
  const [parametroPadrao, setParametroPadrao] = useState(null);
  const [n_Estados, setNEstados] = useState(null);
  const [tableData, setTableData] = useState({});
  const [tabelaRespostas, setTabelaRespostas] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [initialTitulo, setInitialTitulo] = useState('');
  const [initialMensagem, setInitialMensagem] = useState('');
  const [historicoEventos, setHistoricoEventos] = useState([]);

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

  

  const fetchHistoricoEventos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/renderizarpp/historicoEventos/${n_ParametroPadrao}`);
      setHistoricoEventos(response.data);
    } catch (error) {
      console.error("Erro ao buscar histórico de eventos: ", error);
    }
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

    if (n_Estados === 8) {
      fetchHistoricoEventos();
    }

    return () => {
      source.cancel();
    };
  }, [n_ParametroPadrao, n_Estados]);

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
      const uniqueKey = `${resposta.TabelaColuna.TituloColunas}_${resposta.TabelaColuna.n_TabelaColunas}`;
  
      if (!tabelas[idTabela]) {
        tabelas[idTabela] = {
          designacao: resposta.TabelaColuna.TabelaGeral.designacao,
          numero_linhas: resposta.TabelaColuna.TabelaGeral.numero_linhas,
          colunas: new Set(),
          originalNames: {},
          realStuff: {},
          linhas: Array(resposta.TabelaColuna.TabelaGeral.numero_linhas).fill().map((_, i) => ({
            key: i + 1,
          })),
          ids: {},
          rowCounter: {}, // Contador de linha para cada coluna
        };
      }
  
      tabelas[idTabela].colunas.add(uniqueKey);
      tabelas[idTabela].ids[`ncoluna${resposta.TabelaColuna.n_TabelaColunas}`] = resposta.TabelaColuna.n_TabelaColunas;
      tabelas[idTabela].originalNames[uniqueKey] = resposta.TabelaColuna.TituloColunas;
      tabelas[idTabela].realStuff[uniqueKey] = resposta.TabelaColuna.Real;
  
      if (!tabelas[idTabela].rowCounter[uniqueKey]) {
        tabelas[idTabela].rowCounter[uniqueKey] = 0;
      }
  
      // Usamos o contador de linha para determinar onde a resposta deve ser colocada
      const rowIndex = tabelas[idTabela].rowCounter[uniqueKey];
      if (rowIndex < tabelas[idTabela].numero_linhas) {
        tabelas[idTabela].linhas[rowIndex][uniqueKey] = resposta.respostas;
        tabelas[idTabela].rowCounter[uniqueKey]++;
      }
    }
  }
  
  console.log(tabelas);
  
  
  
  
  
  
  

  Object.entries(tabelas).map(([key, tabela]) => (
    console.log(tabela)
  ))

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

const handleClickSubmited = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/api/renderizarpp/parametroPadraoSubmited/${n_ParametroPadrao}`);
    console.log(response.data);
    setNEstados(4);
  } catch (error) {
    console.error("Erro ao alterar o estado: ", error);
  }
};

const handleClickSubmitedtoSaved = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/api/renderizarpp/parametroPadraoSubmitedtoSaved/${n_ParametroPadrao}`);
    console.log(response.data);
    setNEstados(3);
  } catch (error) {
    console.error("Erro ao alterar o estado: ", error);
  }
};

const handleClickCompleto = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/api/renderizarpp/parametroPadraoCompleto/${n_ParametroPadrao}`);
    console.log(response.data);
    setNEstados(7);
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
            <Button type="primary" onClick={handleClickSubmited}>Submited</Button>
            <Button onClick={showModal}>Cancel</Button>
            <Button onClick={handleGuardar}>Guardar</Button>
          </>
        );
      case 4:
        if(isQuality() || isIT()){
          return (
            <>
              <Button type="primary" onClick={handleClickSubmitedtoSaved}>
                Not Approved
              </Button>
              <Button onClick={handleClickCompleto}>Approved</Button>
            </>
          );
        }else{
          return <></>
        }
        case 7:
          return (
            <button onClick={printPDF}>Print as PDF</button>
            );
      default:
        return null;
    }
  };

  // function penis(){
  //   console.log("Executing Penis")
  //   Object.keys(tableData).forEach((tableIndex) => {
  //     const n_TabelaRespostas = Number(tableIndex);
  //     console.log(n_TabelaRespostas)
  //     console.log(tableIndex)
  //   })
  // }

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
  const showModal = () => {
    setTitulo(initialTitulo);
    setMensagem(initialMensagem);
    setIsModalVisible(true);
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  

  const handleCancelar = async () => {
    try {
      console.log("titulo:", titulo);
      console.log("mensagem:", mensagem);
  
      const response = await axios.put(
        `http://localhost:8080/api/renderizarpp/parametroPadraoCancelar/${n_ParametroPadrao}`,
        { Titulo: titulo, Mensagem: mensagem }
      );
  
      console.log("cancelar:", response.data.message);
      console.log("titulo:", response.data.evento.Titulo);
      console.log("mensagem:", response.data.evento.Mensagem);
  
      setIsModalVisible(false); // Hide the modal after successful submission.
    } catch (error) {
      console.error("Erro ao cancelar: ", error);
    }
  };


  const printPDF = async () => {
    try {
      const input = document.getElementById('imprimir');
      const opt = {
        margin: 20,
        filename: 'detalhes.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
  
      await html2pdf().from(input).set(opt).save();
    } catch (error) {
      console.error('Error while generating PDF: ', error);
    }
  };


  

  return (
    <div id="imprimir">
      {/* <button onclick="penis()">Click</button>
      <button onClick={penis}>
  Activate Lasers
</button> */}
    {parametroPadrao ? (
      <>
        Details for the default parameter: {n_ParametroPadrao}
        {/* <p>Descrição: {parametroPadrao.descricao}</p>
        <p>Estados:</p> */}
        {Object.entries(tabelas).map(([key, tabela]) => (
  <div key={key}>
        {console.log(tabela.linhas)}
    <h2>{tabela.designacao}</h2>
    {n_Estados === 3 ? (
      <EditableTable
      columns={Array.from(tabela.colunas).map((column) => (
        tabela.realStuff[column] === "S" ? {
          title: tabela.originalNames[column],
          dataIndex: column,
          key: column,
          render: (text, record) => <input disabled value={text} class="ant-input" />
        } : {
          title: tabela.originalNames[column],
          dataIndex: column,
          key: column,
        }
      ))}
        
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
          title: tabela.originalNames[coluna],
          dataIndex: coluna,
          key: coluna,
          
          
        }))}
        dataSource={tabela.linhas}
        pagination={false}
      />
    )}
  </div>
))}


        {/* <p>n_Formulario: {parametroPadrao.n_Formularios}</p>
        <p>n_VersaoFormulario: {parametroPadrao.n_VersaoFormulario}</p> */}
        {renderButtons(n_Estados)}
        <Modal
        title="Cancelar ParametroPadrao"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="voltar" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="cancelar" type="primary" onClick={handleCancelar}>
            Cancel
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter the cancellation title"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)} // Update the 'titulo' state
        />
        <Input.TextArea
          placeholder="Enter the cancellation message"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)} // Update the 'mensagem' state
        />
      </Modal>
      {n_Estados === 8 && historicoEventos.length > 0 ? (
        <div>
          <h2>History of Events</h2>
          {historicoEventos.map((evento) => (
            <div key={evento.n_HistoricoEventos}>
              <h3>{evento.Titulo}</h3>
              <p>{evento.Mensagem}</p>
            </div>
          ))}
        </div>
      ) : null}
      </>
    ) : (
      <div class="lds-ripple"><div></div><div></div></div>
    )}
  </div>
  
);


};

export default Detalhes;

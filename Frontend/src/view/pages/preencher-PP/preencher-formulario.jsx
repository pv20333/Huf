import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Table, Button, Input } from "antd";
import Swal from 'sweetalert2';
import TabelaMoldes from "./tabelaMoldes";
import TabelaMP from "./tabelaMP";
import TabelaMaquinas from "./tabelaMaquinass"
import '../../components/styles/tabelas.css'
import Ator from "../../components/nameProfile/NameProfile"



const { Option } = Select;

function RenderizarFormulario() {
  const [formularios, setFormularios] = useState([]);
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [tabelasFormulario, setTabelasFormulario] = useState([]);
  const [tabelaRespostas, setTabelaRespostas] = useState({}); // Adicionado estado para armazenar as respostas
  const [designacao, setDesignacao] = useState('');
  const [showTables, setShowTables] = useState(false);


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/editarformulario/formularios")
      .then((res) => {
        setFormularios(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter formulários", error);
      });
  }, []);

  const handleFormularioChange = (value) => {
    setSelectedFormulario(value);
    setShowTables(true); 
    axios
      .get(`http://localhost:8080/api/editarformulario/formularios/${value}`)
      .then((res) => {
        console.log('Dados da API:', res.data);
        setTabelasFormulario(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter tabelas do formulário", error);
      });
  };

  console.log('tabelasFormulario:', tabelasFormulario);

  // const handleInputChange = (columnKey, tableIndex, rowIndex) => (
  //   e
  // ) => {
  //   const newData = {...tabelaRespostas}; // Copia a tabela de respostas
    
  //   // Atualiza a resposta no objeto
  //   if(!newData[tableIndex]) newData[tableIndex] = {};
  //   if(!newData[tableIndex][rowIndex]) newData[tableIndex][rowIndex] = {};
  //   newData[tableIndex][rowIndex][columnKey] = e.target.value;

  //   setTabelaRespostas(newData); // Atualiza o estado da tabela de respostas
  // };

  const handleInputChange = (columnKey, n_tabelaColuna, tableIndex, rowIndex) => (
    e
  ) => {
    const newData = {...tabelaRespostas}; // Copy the response table
    
    // Update the response in the object
    if(!newData[tableIndex]) newData[tableIndex] = {};
    if(!newData[tableIndex][rowIndex]) newData[tableIndex][rowIndex] = {};
    
    // Concatenate columnKey and n_tabelaColuna
    const uniqueKey = `${columnKey}_${n_tabelaColuna}`;
    
    newData[tableIndex][rowIndex][uniqueKey] = e.target.value;
  
    setTabelaRespostas(newData); // Update the state of the response table
  };

  const setDefaultInput = (columnKey, n_tabelaColuna, tableIndex, rowIndex) => {
    const newData = {...tabelaRespostas}; // Copy the response table
    
    // Update the response in the object
    if(!newData[tableIndex]) newData[tableIndex] = {};
    if(!newData[tableIndex][rowIndex]) newData[tableIndex][rowIndex] = {};
    
    // Concatenate columnKey and n_tabelaColuna
    const uniqueKey = `${columnKey}_${n_tabelaColuna}`;
    
    newData[tableIndex][rowIndex][uniqueKey] = "";
  
    setTabelaRespostas(newData); // Update the state of the response table
  };

  const handleDesignacaoChange = (e) => {
    setDesignacao(e.target.value);
  }; 

  const handleGuardar = () => {

    return new Promise((resolve, reject) => {

    if(designacao == null || designacao.length == 0 || designacao == ""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill the description.',
      })
      return
    }

    const parametroPadrao = {
      designacao
    };
  
    axios
      .post(`http://localhost:8080/api/preencherformulario/formularios/${selectedFormulario}/adicionarparametropadrao`, parametroPadrao)
      .then((res) => {
        console.log(res);
        const n_ParametroPadrao = res.data.n_ParametroPadrao; // Obtém o ID do novo parâmetro padrão criado

        Object.keys(tabelaRespostas).forEach((tableIndex) => {
          const n_TabelaRespostas = Number(tableIndex);  // Esta é uma suposição. Você deve substituir isso pela lógica correta.

          tabelasFormulario[tableIndex]?.TabelaGeral?.Colunas?.forEach((coluna) => {
            const n_TabelaColunas = coluna.n_TabelaColunas;

            Object.keys(tabelaRespostas[tableIndex]).forEach((rowIndex) => {
              // Create a unique key to access the responses
              const uniqueKey = `${coluna.TituloColunas}_${n_TabelaColunas}`;

              const resposta = {
                n_TabelaRespostas,
                n_ParametroPadrao,
                n_TabelaColunas,
                respostas: tabelaRespostas[tableIndex][rowIndex][uniqueKey]
              };

              console.log('Enviando resposta:', resposta); // <-- Log aqui
  
              axios
                .post(`http://localhost:8080/api/preencherformulario/formularios/${selectedFormulario}/adicionarrespostas`, resposta)
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.error("Erro ao adicionar respostas", error);
                });
            });
          });
        });
        resolve(res); // Resolve a Promise
      })
      .catch((error) => {
        console.error("Erro ao guardar", error);
        reject(error);
      });
    });
  };


  const handleSubmeter = () => {

    handleGuardar()
    .then((response) => {
      console.log(response)
      let id = response.data.n_ParametroPadrao;
    const parametroPadrao = {
      n_ParametroPadrao: id,
      designacao
    };

  
    axios
      .post(`http://localhost:8080/api/preencherformulario/formularios/${selectedFormulario}/submeter`, parametroPadrao)
      .then((res) => {
        console.log(res);
        const n_ParametroPadrao = res.data.n_ParametroPadrao;
  
        Object.keys(tabelaRespostas).forEach((tableIndex) => {
          const n_TabelaRespostas = Number(tableIndex);
  
          tabelasFormulario[tableIndex]?.TabelaGeral?.Colunas?.forEach((coluna) => {
            const n_TabelaColunas = coluna.n_TabelaColunas;
  
            Object.keys(tabelaRespostas[tableIndex]).forEach((rowIndex) => {
              const resposta = {
                n_TabelaRespostas,
                n_ParametroPadrao,
                n_TabelaColunas,
                respostas: tabelaRespostas[tableIndex][rowIndex][coluna.TituloColunas]
              };
  
              console.log('Submetendo resposta:', resposta);
  
              axios
                .post(`http://localhost:8080/api/preencherformulario/formularios/${selectedFormulario}/adicionarrespostas`, resposta)
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.error("Erro ao adicionar respostas", error);
                });
            });
          });
        });
      })
      .catch((error) => {
        console.error("Erro ao submeter", error);
        });
    })
    .catch((error) => {
      console.error("Não foi possível executar handleSubmeter devido a um erro em handleGuardar", error);
    });
};

  const initializeTabelaRespostas = (tabelas) => {
    const initialData = {};
  
    if (Array.isArray(tabelas)) {
      tabelas.forEach((tabela, tableIndex) => {
        console.log(`Inicializando dados para a tabela ${tableIndex}`);
        
        initialData[tableIndex] = {};
  
        tabela?.TabelaGeral?.Colunas?.forEach((coluna) => {
          const uniqueKey = `${coluna.TituloColunas}_${coluna.n_TabelaColunas}`;
  
          // Suponho que você tenha um número específico de linhas para inicializar. Usando a propriedade numero_linhas.
          const numLinhas = tabela?.TabelaGeral?.numero_linhas ?? 0;
          for (let rowIndex = 0; rowIndex < numLinhas; rowIndex++) {
            if (!initialData[tableIndex][rowIndex]) {
              initialData[tableIndex][rowIndex] = {};
            }
            initialData[tableIndex][rowIndex][uniqueKey] = ''; // valor padrão para a entrada
          }
        });
      });
    }
  
    setTabelaRespostas(initialData);  // Atualizando o estado com os valores padrões.
    console.log("---------------setTabelaRespostas")
    console.log(initialData)
  };
  
  useEffect(() => {
    initializeTabelaRespostas(tabelasFormulario);
  }, [tabelasFormulario]);

  
  

  return (
    <div>
      <h3>Enter the name of the default parameter</h3>
      <Input onChange={handleDesignacaoChange} value={designacao} />
      <br />
      <br />
      <h4 >Author: <Ator/></h4>
      <br />
      <h3>Chose a Form</h3>
      <Select style={{ width: 200 }} onChange={handleFormularioChange}>
        {formularios.map((formulario) => (
          <Option
            key={formulario.n_Formularios}
            value={formulario.n_Formularios}
          >
            {formulario.designacao}
          </Option>
        ))}
      </Select>
      <br />
      <TabelaMaquinas show={showTables} />
      <br />
      <TabelaMoldes show={showTables} />
      <br />
      <TabelaMP show={showTables} />

      <br/>

      {Array.isArray(tabelasFormulario) && tabelasFormulario.map((tabela, tableIndex) => {
        console.log(`Renderizando a tabela ${tableIndex}`);
        const columns = tabela?.TabelaGeral?.Colunas?.map((coluna) => {
          return {
            title: coluna.TituloColunas,
            dataIndex: coluna.TituloColunas,
            key: coluna.n_TabelaColunas,
            render: (text, _, rowIndex) => (
              <Input 
                //value={tabelaRespostas[tableIndex]?.[rowIndex]?.[coluna.TituloColunas] ?? ''} 
                //value={tableIndex + " | " + rowIndex + " | " + coluna.n_TabelaColunas} 
                value={tabelaRespostas[tableIndex]?.[rowIndex]?.[`${coluna.TituloColunas}_${coluna.n_TabelaColunas}`] ?? ''}


                //onChange={handleInputChange(coluna.TituloColunas, tableIndex, rowIndex)} 
                onChange={handleInputChange(coluna.TituloColunas, coluna.n_TabelaColunas, tableIndex, rowIndex)}


                disabled={coluna.Real == "S" ? true : false }
              />
            )
          }
        }) ?? [];
        return (
          <div key={tableIndex} style={{ marginBottom: "20px" }}>
            <Table
              columns={columns}
              dataSource={Array.from(
                { length: tabela?.TabelaGeral?.numero_linhas ?? 0 },
                (_, i) => ({
                  key: i
                })
              )}
              pagination={false}
            />
          </div>
        );
      })}

      <Button onClick={handleGuardar}>Save</Button>
      <Button onClick={handleSubmeter}>Submit</Button>

    </div>

    
  );
}

export default RenderizarFormulario;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Table, Button, Input } from "antd";

const { Option } = Select;

function RenderizarFormulario() {
  const [formularios, setFormularios] = useState([]);
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [tabelasFormulario, setTabelasFormulario] = useState([]);
  const [tabelaRespostas, setTabelaRespostas] = useState({}); // Adicionado estado para armazenar as respostas
  const [designacao, setDesignacao] = useState('');

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

  const handleDesignacaoChange = (e) => {
    setDesignacao(e.target.value);
  };

  const handleGuardar = () => {
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
              const resposta = {
                n_TabelaRespostas,
                n_ParametroPadrao,
                n_TabelaColunas,
                respostas: tabelaRespostas[tableIndex][rowIndex][coluna.TituloColunas]
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
      })
      .catch((error) => {
        console.error("Erro ao guardar", error);
      });
  };

  const handleSubmeter = () => {
    const parametroPadrao = {
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
  };
  

  return (
    <div>
      <h1>Insira o nome do parâmetro padrão</h1>
      <Input onChange={handleDesignacaoChange} value={designacao} />

      <h1>Escolha um Formulário</h1>
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

      {Array.isArray(tabelasFormulario) && tabelasFormulario.map((tabela, tableIndex) => {
        console.log(`Renderizando a tabela ${tableIndex}`);
        const columns = tabela?.TabelaGeral?.Colunas?.map((coluna) => {
          return {
            title: coluna.TituloColunas,
            dataIndex: coluna.TituloColunas,
            key: coluna.n_TabelaColunas,
            render: (text, _, rowIndex) => (
              <Input 
                value={tabelaRespostas[tableIndex]?.[rowIndex]?.[coluna.TituloColunas] ?? ''} 
                onChange={handleInputChange(coluna.TituloColunas, tableIndex, rowIndex)} 
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
      <Button onClick={handleGuardar}>Guardar</Button>
      <Button onClick={handleSubmeter}>Submeter</Button>
    </div>
  );
}

export default RenderizarFormulario;

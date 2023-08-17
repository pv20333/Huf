import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Table, Button, Input } from "antd";

const { Option } = Select;

function EscolherTabela() {
  const [tabelas, setTabelas] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [nomeFormulario, setNomeFormulario] = useState("");
  

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/escolhertabela/tabelas-geral")
      .then((res) => {
        setTabelas(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter tabelas", error);
      });

      
  }, []);

  const handleTabelaChange = (index, id) => {
    console.log('handleTabelaChange', { index, id });
    axios
      .get(`http://localhost:8080/api/escolhertabela/colunas/${id}`)
      .then((res) => {
        const newTables = [...selectedTables];
        newTables[index] = {
          ...res.data,
          id,
          colunas: res.data.colunas.map((coluna) => ({
            title: coluna.TituloColunas,
            dataIndex: coluna.TituloColunas,
          })),
        };
        setSelectedTables(newTables);
      })
      .catch((error) => {
        console.error("Erro ao obter colunas", error);
      });
  };

  const handleAddTable = () => {
    setSelectedTables([...selectedTables, {}]);
  };

  const handleNomeFormularioChange = (event) => {
    setNomeFormulario(event.target.value);
  };

  const handleGuardar = () => {
    console.log('handleGuardar', { nomeFormulario, tabelas: selectedTables.map((table) => table.n_TabelaGeral) });
    axios
      .post(`http://localhost:8080/api/escolhertabela/guardar`, {
        nomeFormulario,
        tabelas: selectedTables.map((table) => table.id),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Erro ao guardar", error);
      });
  };

  return (
    <div>
      <h1>Choose a Table</h1>
      <Input
        placeholder="Form name"
        value={nomeFormulario}
        onChange={handleNomeFormularioChange}
      />
      {selectedTables.map((table, index) => (
        <div key={index}>
          <Select
            style={{ width: 200 }}
            onChange={(value) => handleTabelaChange(index, value)}
          >
            {tabelas.map((tabela) => (
              <Option key={tabela.n_TabelaGeral} value={tabela.n_TabelaGeral}>
                {tabela.designacao}
              </Option>
            ))}
          </Select>
          <Table
            columns={table.colunas}
            dataSource={Array.from({ length: table.numero_linhas }, (_, i) => ({
              key: i,
            }))}
            pagination={false}
          />
        </div>
      ))}
      <Button onClick={handleAddTable}>Add Table</Button>
      <Button onClick={handleGuardar}>Save</Button>
    </div>
  );
}

export default EscolherTabela;

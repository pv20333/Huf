import React, { useState, useEffect } from "react";
import { Button, InputNumber, Form, Input, Table, Checkbox } from "antd";
import axios from "axios";
import '../../components/styles/tabelas.css'


const { Item } = Form;

function Tabela() {
  const [numLinhas, setNumLinhas] = useState(0);
  const [numColunas, setNumColunas] = useState(0);
  const [dados, setDados] = useState([]);
  const [renderTable, setRenderTable] = useState(false);
  const [nomeTabela, setNomeTabela] = useState("");
  const [realValues, setRealValues] = useState(Array(numColunas).fill("Nao"));

  useEffect(() => {
    setRealValues(Array(numColunas).fill("Nao"));
  }, [numColunas]);

  const handleNumLinhasChange = (value) => {
    setNumLinhas(value);
    setDados((dados) => {
      const diferenca = value - (dados.length - 1);
      if (diferenca > 0) {
        const novosDados = Array(diferenca)
          .fill(null)
          .map(() => Array(numColunas).fill(""));
        return [...dados, ...novosDados];
      } else {
        return [dados[0], ...dados.slice(1, value + 1)];
      }
    });
  };

  const handleNumColunasChange = (value) => {
    setNumColunas(value);
    setDados((dados) =>
      dados.map((linha) =>
        linha.length < value
          ? [...linha, ...Array(value - linha.length).fill("")]
          : linha.slice(0, value)
      )
    );
    setRealValues(Array(value).fill("Nao"));
  };

  const handleNomeColunaChange = (event, index) => {
    const { value } = event.target;
    setDados((dados) =>
      dados.map((linha, i) => {
        if (i === 0) {
          return linha.map((nome, j) => (j === index ? value : nome));
        } else {
          return linha;
        }
      })
    );
  };

  const handleRealCheckboxChange = (event, index) => {
    const { checked } = event.target;
    setRealValues((prevRealValues) => {
      const newRealValues = [...prevRealValues];
      newRealValues[index] = checked ? "Sim" : "Nao";
      return newRealValues;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Dados da tabela:");
      console.log("Nome da Tabela:", nomeTabela);
      console.log("Número de Linhas:", numLinhas);
      console.log("Número de Colunas:", numColunas);
      console.log("Dados das Colunas:", dados[0]);
      console.log("Valores Real:", realValues);

      // Criação da tabela geral
      const resGeral = await axios.post("http://localhost:8080/api/tabela/geral", {
        nome: nomeTabela,
        numero_linhas: numLinhas,
      });

      // Criação das colunas
      const colunasRequests = dados[0].map(async (tituloColuna, index) => {
        return await axios.post("http://localhost:8080/api/tabela/colunas", {
          n_TabelaGeral: resGeral.data.n_TabelaGeral,
          colunas: [tituloColuna],
          Real: realValues[index],
        });
      });
      await Promise.all(colunasRequests);

      console.log("Tabela e colunas criadas com sucesso");
      setRenderTable(true);

       // setNumLinhas(0);
      // setNumColunas(0);
      // setDados([]);
      // setNomeTabela("");

    } catch (error) {
      console.error("Erro ao criar tabela e colunas", error);
    }
  };

  const columns = dados[0]?.map((nomeColuna, index) => ({
    title: nomeColuna,
    dataIndex: `coluna${index}`,
    key: `coluna${index}`,
  }));

  const dataSource = dados.slice(1).map((linha, index) => {
    const row = {};
    linha.forEach((value, i) => {
      row[`coluna${i}`] = value;
    });
    row.key = index;
    return row;
  });

  return (
    <div>
      <Form layout="inline" onSubmit={handleFormSubmit}>
        <Form.Item label="Lines">
          <InputNumber
            min={0}
            value={numLinhas}
            onChange={handleNumLinhasChange}
          />
        </Form.Item>
        <Form.Item label="Columns">
          <InputNumber
            min={0}
            value={numColunas}
            onChange={handleNumColunasChange}
          />
        </Form.Item>
        <Form.Item label="Name of the table" >
          <Input
            placeholder="Insert name"
            value={nomeTabela}
            onChange={(e) => setNomeTabela(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleFormSubmit}>
            Create Table
          </Button>
        </Form.Item>
      </Form>
  
      {dados[0]?.map((_, index) => (
        <div key={index}>
          <br />
          <Input
            style={{ width: '400px' }}
            placeholder={`Name of the column ${index + 1}`}
            onChange={(event) => handleNomeColunaChange(event, index)}
          />
          <label htmlFor={`real-checkbox-${index}`}>
            Real:
            <Checkbox
              id={`real-checkbox-${index}`}
              checked={realValues[index] === "Sim"}
              onChange={(event) => handleRealCheckboxChange(event, index)}
            >
              {/* {realValues[index] === "Sim" ? "Sim" : "Nao"} */}
            </Checkbox>
          </label>
        </div>
      ))}
      {renderTable && (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          //scroll={{ y: 300 }}
        />
      )}
    </div>
  );
}

export default Tabela;

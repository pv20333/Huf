import React, { useState } from "react";
import { Button, InputNumber, Form, Input, Table } from "antd";
import axios from "axios";

const { Item } = Form;

function Tabela() {
  const [numLinhas, setNumLinhas] = useState(0);
  const [numColunas, setNumColunas] = useState(0);
  const [dados, setDados] = useState([]);
  const [renderTable, setRenderTable] = useState(false);
  const [nomeTabela, setNomeTabela] = useState("");

  const handleNumLinhasChange = (value) => {
    setNumLinhas(value);
    setDados((dados) => {
      const diferenca = value - (dados.length - 1);  // subtrai 1 da contagem de linhas de dados
      if (diferenca > 0) {
        const novosDados = Array(diferenca)
          .fill(null)
          .map(() => Array(numColunas).fill(""));
        return [...dados, ...novosDados];
      } else {
        return [dados[0], ...dados.slice(1, value + 1)];  // adiciona 1 ao índice final
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Criação da tabela geral
      const resGeral = await axios.post(
        "http://localhost:8080/api/tabela/geral",
        {
          nome: nomeTabela,
          numero_linhas: numLinhas,
        }
      );

      // Criação das colunas
      const colunasRequests = dados[0].map(async (tituloColuna) => {
        return await axios.post("http://localhost:8080/api/tabela/colunas", {
          n_TabelaGeral: resGeral.data.n_TabelaGeral,
          colunas: [tituloColuna],
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
        <Item label="Linhas">
          <InputNumber
            min={0}
            value={numLinhas}
            onChange={handleNumLinhasChange}
          />
        </Item>
        <Item label="Colunas">
          <InputNumber
            min={0}
            value={numColunas}
            onChange={handleNumColunasChange}
          />
        </Item>
        <Item label="Nome da Tabela">
          <Input
            value={nomeTabela}
            onChange={(e) => setNomeTabela(e.target.value)}
          />
        </Item>
        <Item>
          <Button type="primary" onClick={handleFormSubmit}>
            Criar Tabela
          </Button>
        </Item>
      </Form>
      {dados[0]?.map((_, index) => (
        <Input
          key={index}
          placeholder={`Nome da coluna ${index + 1}`}
          onChange={(event) => handleNomeColunaChange(event, index)}
        />
      ))}
      {renderTable && (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ y: 300 }}
        />
      )}
    </div>
  );
}

export default Tabela;

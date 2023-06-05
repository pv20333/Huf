import { useState } from "react";
import { Table, Button, Collapse } from "antd";

const { Panel } = Collapse;
const { Column } = Table;

const initialData = [
  {
    key: "Padrao",
    C: "ºC",
    C1: "290",
    C2: "285",
    C3: "280",
    tolerancia: "10",
  },
];

const App = () => {
  const [data, setData] = useState(initialData);
  const [columnsCount, setColumnsCount] = useState(4);

  const handleAddColumn = () => {
    const nextColumnsCount = columnsCount + 1;
    setColumnsCount(nextColumnsCount);
    setData((prevData) => {
      return prevData.map((row) => {
        return {
          ...row,
          [`C${nextColumnsCount}`]: "",
        };
      });
    });
  };

  const handleRemoveColumn = () => {
    if (columnsCount <= 4) return; // não remover a coluna "C4" ou abaixo

    const nextColumnsCount = columnsCount - 1;
    setColumnsCount(nextColumnsCount);
    setData((prevData) => {
      const newData = [...prevData];
      newData.forEach((row) => {
        delete row[`C${nextColumnsCount}`];
      });
      return newData;
    });
  };

  const columns = [
    { title: "", dataIndex: "key", key: "key" },
    { title: "Unidades", dataIndex: "C", key: "C" },
    ...Array.from({ length: columnsCount }, (_, i) => {
      const C = `C${i + 1}`;
      return { title: C, dataIndex: C, key: C };
    }),
    { title: "Tolerancia. Max(+/-)", dataIndex: "tolerancia", key: "tolerancia" },
  ];

  return (
    <Collapse size="small" defaultActiveKey={["1"]}>
      <Panel header="Temperatura das Câmaras Quentes" key="1">
        <Button onClick={handleAddColumn}>Adicionar Coluna</Button>
        <Button onClick={handleRemoveColumn}>Remover Coluna</Button>
        <Table dataSource={data} columns={columns} pagination={false} />
      </Panel>
    </Collapse>
  );
};

export default App;

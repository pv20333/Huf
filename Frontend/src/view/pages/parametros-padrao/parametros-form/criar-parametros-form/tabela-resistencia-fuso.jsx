import { Table, Menu, Dropdown, Button, Collapse } from "antd";
import { useState } from "react";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Padrao",
    c: "ºC",
    bico1: "295",
    cil2: "290",
    cil3: "285",
    cil4: "280",
    tolerancia: "10",
  },
];

const App = () => {
  const [columns, setColumns] = useState(["2-Cil", "3-Cil", "4-Cil"]);

  const addColumn = () => {
    const newColumn = columns[columns.length - 1].split("-")[0];
    const nextNumber = parseInt(newColumn, 10) + 1;
    const nextColumnName = `${nextNumber}-Cil`;
    setColumns([...columns, nextColumnName]);
  };

  const removeColumn = () => {
    if (columns.length > 3) {
      const newColumns = [...columns];
      newColumns.pop();
      setColumns(newColumns);
    }
  };

  return (
    <>
      <Collapse size="small" defaultActiveKey={["1"]} onChange={() => {}}>
        <Panel header="Temperatura das Resistências do Fuso" key="1">
          <Button onClick={addColumn}>Adicionar coluna</Button>
          <Button onClick={removeColumn}>Remover coluna</Button>
          <Table dataSource={data} pagination={false}>
            <Column title="" dataIndex="key" key="key" />
            <Column title="Unidades" dataIndex="c" key="c" />
            <Column title="1-Bico" dataIndex="bico1" key="bico1" />
            {columns.map((column) => (
              <Column
                title={column}
                dataIndex={column.toLowerCase()}
                key={column}
              />
            ))}
            <Column
              title="Tolerancia. Max(+/-)"
              dataIndex="tolerancia"
              key="tolerancia"
            />
          </Table>
        </Panel>
      </Collapse>
    </>
  );
};

export default App;

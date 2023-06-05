import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const columns = [
  {
    title: "Peso (g.)",
    dataIndex: "peso",
    key: "peso",
  },
  {
    title: "Padrão",
    dataIndex: "padrao",
    key: "padrao",
  },
];

const onChange = (activeKey) => {
  console.log(`onChange ${activeKey}`);
};

const data = [
  {
    key: "1",
    peso: "Med.",
    padrao: "",
  },
  {
    key: "2",
    peso: "Max.",
    padrao: "",
  },
  {
    key: "3",
    peso: "Min.",
    padrao: "",
  },
];
const App = () => (
  <Collapse size="small" defaultActiveKey={["1"]}>
    <Panel header="Dados Adicionais: Pesos" key="1">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Panel>
  </Collapse>
);
export default App;

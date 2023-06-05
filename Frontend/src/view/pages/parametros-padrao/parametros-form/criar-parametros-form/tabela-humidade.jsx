import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const columns = [
  {
    title: "Referência Huf",
    dataIndex: "referenciahuf",
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
  },
  {
    title: "Huimidade Padrão(%)",
    dataIndex: "humidade",
  },
];
const data = [
  {
    key: "1",
    referenciahuf: "1548",
    descricao: "sdfgsdf",
    humidade: "10",
  },
  {
    key: "2",
    referenciahuf: "56487",
    descricao: "jkljklj",
    humidade: "15",
  },
  {
    key: "3",
    referenciahuf: "65417",
    descricao: "bnmbvnvbn",
    humidade: "20",
  },
];
const onChange = (activeKey) => {
  console.log(`onChange ${activeKey}`);
};
const App = () => (
  <>
    {/* <Divider>Middle size table</Divider>
    <Table columns={columns} dataSource={data} size="middle" /> */}

    <Collapse size="small" defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Dados adicionais: Humidade" key="1">
        <Table columns={columns} dataSource={data} size="small" pagination={false} />
      </Panel>
    </Collapse>
  </>
);
export default App;

import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const columns = [
  {
    title: "Nº máquina",
    dataIndex: "nmaquina",
  },
  {
    title: "Marca/Modelo",
    dataIndex: "marcamodelo",
  },
  {
    title: "Força Fecho (ton)",
    dataIndex: "forcafecho",
  },
  {
    title: "Diam. Fuso",
    dataIndex: "diamfuso",
  },
];
const data = [
  {
    key: "1",
    nmaquina: "1548",
    marcamodelo: "engel",
    forcafecho: "150",
    diamfuso: "50",
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
      <Panel header="Dados da Máquina" key="1">
        <Table columns={columns} dataSource={data} size="small" pagination={false} />
      </Panel>
    </Collapse>
  </>
);
export default App;

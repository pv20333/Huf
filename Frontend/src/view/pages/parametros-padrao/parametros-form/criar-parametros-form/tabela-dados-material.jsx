import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const columns = [
  {
    title: "Referencia Huf",
    dataIndex: "referencia",
  },
  {
    title: "Descrição",
    dataIndex: "descrição",
  },
  {
    title: "Process. (ºC)",
    dataIndex: "process",
  },
  {
    title: "Temp. Molde (ºC)",
    dataIndex: "tempmolde",
  },
  {
    title: "Secagem (ºC/h)",
    dataIndex: "secagem",
  },
  {
    title: "Humidade (%)",
    dataIndex: "humidade",
  },
];
const data = [
  {
    key: "1",
    referencia: "98654215",
    descrição: "grivory",
    process: "270-300",
    tempmolde: "80-120",
    secagem: "80/4",
    humidade: "5",

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
      <Panel header="Dados do Material" key="1">
        <Table columns={columns} dataSource={data} size="small" pagination={false} />
      </Panel>
    </Collapse>
  </>
);
export default App;

import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Padrao",
    c: "ºC",
    partefixa: "80",
    tolmax: "5",
    partemovel: "80",
    tolmax2: "5",
    mov1: "",
    tolmax3: "",
    mov2: "",
    tolmax4: "",


  },
];

const onChange = (activeKey) => {
  console.log(`onChange ${activeKey}`);
};

const App = () => (
  <Collapse size="small" defaultActiveKey={["1"]}>
    <Panel header="Temperatura dos Canais dos Moldes" key="1">
      <Table dataSource={data} pagination={false}>
        <Column title="" dataIndex="key" key="key" />
        <Column title="Unidades" dataIndex="segundos" key="segundos" />
        <Column title="Parte Fixa" dataIndex="partefixa" key="partefixa" />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax" key="tolmax" />
        <Column
          title="Parte Móvel"
          dataIndex="partemovel"
          key="partemovel"
        />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax2" key="tolmax2" />
        <Column title="Mov. 1" dataIndex="mov1" key="mov1" />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax3" key="tolmax3" />
        <Column title="Mov. 2" dataIndex="mov2" key="mov2" />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax4" key="tolmax4" />
        

      </Table>
    </Panel>
  </Collapse>
);
export default App;

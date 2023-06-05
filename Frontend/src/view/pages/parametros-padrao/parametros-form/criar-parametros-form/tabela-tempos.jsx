import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Padrao",
    segundos: "Segundos",
    arrefecimento: "15",
    tolmax: "3",
    tempociclo: "27",
    tolmax2: "3",
  },
];

const onChange = (activeKey) => {
  console.log(`onChange ${activeKey}`);
};

const App = () => (
  <Collapse size="small" defaultActiveKey={["1"]}>
    <Panel header="Tempos" key="1">
      <Table dataSource={data} pagination={false}>
        <Column title="" dataIndex="key" key="key" />
        <Column title="Unidades" dataIndex="segundos" key="segundos" />
        <Column title="Arrefecimento" dataIndex="arrefecimento" key="arrefecimento" />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax" key="tolmax" />
        <Column
          title="Tempo de Ciclo"
          dataIndex="tempociclo"
          key="tempociclo"
        />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax2" key="tolmax2" />
      </Table>
    </Panel>
  </Collapse>
);
export default App;

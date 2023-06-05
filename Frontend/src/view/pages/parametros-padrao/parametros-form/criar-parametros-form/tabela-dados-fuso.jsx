import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Padrao",
    mm: "mm",
    curso: "18",
    tolmax: "2",
    comutacao: "11",
    tolmax2: "3",
    almofada: "4.9",
    tolmax3: "2",
    dosagem: "5",
  },
];

const onChange = (activeKey) => {
  console.log(`onChange ${activeKey}`);
};

const App = () => (
  <Collapse size="small" defaultActiveKey={["1"]}>
    <Panel header="Dados do Fuso" key="1">
      <Table dataSource={data} pagination={false}>
        <Column title="" dataIndex="key" key="key" />
        <Column title="Unidades" dataIndex="mm" key="mm" />
        <Column title="Curso/Dosagem" dataIndex="curso" key="curso" />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax" key="tolmax" />
        <Column
          title="Posição de Comutação"
          dataIndex="comutacao"
          key="comutacao"
        />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax2" key="tolmax2" />
        <Column title="Monit.Almofada" dataIndex="almofada" key="almofada" />
        <Column title="Tole.Max(+/-)" dataIndex="tolmax3" key="tolmax3" />
        <Column title="Descomp. Dosagem" dataIndex="dosagem" key="dosagem" />
      </Table>
    </Panel>
  </Collapse>
);
export default App;

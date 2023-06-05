import { Table, Menu, Dropdown, Button, Collapse } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch, Space } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Incluido?",
  },
];

const App = () => (
  <Table dataSource={data} pagination={false}>
    <Column title="" dataIndex="key" key="key" />
    <Column
      title="Reciclado"
      dataIndex="extracao"
      key="extracao"
      render={() => (
        <Switch
          checkedChildren="Sim"
          unCheckedChildren="Não"
          defaultChecked
        />
      )}
    />
  </Table>
);
export default App;

import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Padrao",
    mm: "mm",
    aberturamolde: "250",
    
  },
];



const App = () => (
  
      <Table dataSource={data} pagination={false}>
        <Column title="" dataIndex="key" key="key" />
        <Column title="Unidades" dataIndex="mm" key="mm" />
        <Column title="Abertura Molde" dataIndex="aberturamolde" key="aberturamolde" />

        
        
      </Table>
    
);
export default App;

import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Padrao",
    ciclos: "ciclos",
    extracao: "2",
    
  },
];



const App = () => (
  
      <Table dataSource={data} pagination={false}>
        <Column title="" dataIndex="key" key="key" />
        <Column title="Unidades" dataIndex="ciclos" key="ciclos" />
        <Column title="Extração (repetições)" dataIndex="extracao" key="extracao" />

        
        
      </Table>
    
);
export default App;

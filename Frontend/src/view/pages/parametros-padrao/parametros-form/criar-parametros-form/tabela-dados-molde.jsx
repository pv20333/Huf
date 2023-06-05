import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const columns = [
  {
    title: 'Nº molde',
    dataIndex: 'nmolde',
  },
  {
    title: 'Cav. Oper.',
    dataIndex: 'cavoper',
  },
  {
    title: 'PartNumber',
    dataIndex: 'partnumber',
  },
  {
    title: 'Descrição',
    dataIndex: 'descricao',
  },
];
const data = [
  {
    key: '1',
    nmolde: 'John Brown',
    cavoper: 32,
    partnumber: '54456456',
    descricao: 'sdfdfgsfdgdfgsdfgs',
  },
  
];
const onChange = (activeKey) => {
    console.log(`onChange ${activeKey}`);
  };
const App = () => (
  <>
    {/* <Divider>Middle size table</Divider>
    <Table columns={columns} dataSource={data} size="middle" /> */}
    
    <Collapse size="small" defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="Dados do Molde" key="1">
    <Table columns={columns} dataSource={data} size="small" pagination={false} />
    </Panel>
    </Collapse>
  </>
);
export default App;
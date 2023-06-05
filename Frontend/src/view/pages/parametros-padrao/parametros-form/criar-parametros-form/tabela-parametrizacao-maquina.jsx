import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "Padrao",
    fmm: "F/mm",
    forca: "900",
    ponto: "0.5",
    forca2: "14",
    ponto2: "55",
  },
];



const App = () => (
  
      <Table dataSource={data} pagination={false}>
        <Column title="" dataIndex="key" key="key" />
        <Column title="Unidades" dataIndex="fmm" key="fmm" />

        <ColumnGroup title="fim da protecao de molde">
          <Column title="Forca" dataIndex="forca" key="forca" />
          <Column title="Ponto" dataIndex="ponto" key="ponto" />
        </ColumnGroup>
        <ColumnGroup title="pressao da protecao de molde">
          <Column title="Forca2" dataIndex="forca2" key="forca2" />
          <Column title="Ponto2" dataIndex="ponto2" key="ponto2" />
        </ColumnGroup>
        
      </Table>
    
);
export default App;

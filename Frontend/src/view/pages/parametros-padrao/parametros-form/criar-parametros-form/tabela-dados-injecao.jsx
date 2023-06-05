import React, { useState } from "react";
import { Table, Menu, Dropdown, Button, Collapse } from "antd";
const { Panel } = Collapse;

const dataSource = [
  {
    key: "1",
    etapas: "Velocidade (m/s)",
    "1º Padrao": 97,
    "2º Padrao": 56,
    "3º Padrao": 32,
    tolerancia: 5,
  },
  {
    key: "2",
    etapas: "Velocidade (m/s)",
    "1º Padrao": 56,
    "2º Padrao": 64,
    "3º Padrao": 27,
    tolerancia: 3,
  },
  {
    key: "3",
    etapas: "Lim Pressao Trabalho",
    "1º Padrao": 48,
    "2º Padrao": 24,
    "3º Padrao": 32,
    tolerancia: 2,
  },
  {
    key: "4",
    etapas: "Lim Pressao Trabalho",
    "1º Padrao": 50,
    "2º Padrao": 16,
    "3º Padrao": 32,
    tolerancia: 4,
  },
];

export default function App() {
  const [paginationInfo, setPaginationInfo] = useState({
    current: 1,
    pageSize: 10,
  });

  const [columnList, setColumnList] = useState([
    {
      title: "etapas",
      dataIndex: "etapas",
      key: "etapas",
      fixed: "left",
      width: 150,
      render: (value, row, index) => {
        const trueIndex =
          index + paginationInfo.pageSize * (paginationInfo.current - 1);
        const obj = {
          children: value,
          props: {},
        };
        if (index >= 1 && value === dataSource[trueIndex - 1].etapas) {
          obj.props.rowSpan = 0;
        } else {
          let rowspan = 1;
          for (
            let i = 1;
            trueIndex + i !== dataSource.length &&
            value === dataSource[trueIndex + i].etapas;
            i += 1
          ) {
            rowspan = i + 1;
          }
          obj.props.rowSpan = rowspan;
        
        
          // if (columnList.some((col) => col.canDelete)) {
          //   obj.children = (
          //     <>
          //       <div>{value}</div>
          //       {columnList.map((col) => {
          //         if (col.canDelete) {
          //           return (
          //             <div
          //               key={col.key}
          //               style={{ display: "flex", justifyContent: "center" }}
          //             >
          //               <Button
          //                 type="text"
          //                 danger
          //                 onClick={() => handleDeleteColumn(col.key)}
          //               >
          //                 X
          //               </Button>
          //             </div>
          //           );
          //         } else {
          //           return <div key={col.key} />;
          //         }
          //       })}
          //     </>
          //   );
          // }
        }
        return obj;
      },
    },
    {
      title: "1º Padrao",
      dataIndex: "1º Padrao",
      key: "1º Padrao",
    },
    {
      title: "2º Padrao",
      dataIndex: "2º Padrao",
      key: "2º Padrao",
    },
    {
      title: "3º Padrao",
      dataIndex: "3º Padrao",
      key: "3º Padrao",
    },
    {
      title: "tolerancia",
      dataIndex: "tolerancia",
      key: "tolerancia",
      fixed: "right",
    },
    {
      title: "action",
      key: "action",
      fixed: "right",
      render: (text, record, index) => (
        <Button type="text" danger onClick={() => handleDeleteRow(record.key)}>
          Apagar
        </Button>
      ),
    },
  ]);

  // const handleDeleteColumn = (key) => {
  //   const index = columnList.findIndex((col) => col.key === key);
  //   const newColumnList = columnList
  //     .map((col, index) => ({
  //       ...col,
  //       render: (text) => (
  //         <>
  //           {text}
  //           {col.canDelete && (
  //             <Button
  //               type="text"
  //               danger
  //               style={{
  //                 visibility: deleteButtonVisible[index].visible
  //                   ? "visible"
  //                   : "hidden",
  //               }}
  //               onClick={() => handleDeleteColumn(col.key)}
  //             >
  //               X
  //             </Button>
  //           )}
  //         </>
  //       ),
  //       onHeaderCell: () => ({
  //         onMouseEnter: () => handleMouseEnter(col.key),
  //         onMouseLeave: () => handleMouseLeave(col.key),
  //       }),
  //     }))
  //     .filter((col) => col.key !== key); // remova a coluna com a chave especificada
  //   setColumnList(newColumnList); // atualize o estado com a nova lista de colunas atualizadas
  // };


  const handleDeleteRow = (key) => {
    const newDataSource = dataSource.filter((item) => item.key !== key);
    setDataSource(newDataSource);
  
    setPaginationInfo({
      ...paginationInfo,
      current:
        paginationInfo.current > Math.ceil(newDataSource.length / paginationInfo.pageSize)
          ? Math.ceil(newDataSource.length / paginationInfo.pageSize)
          : paginationInfo.current
    });
  };
  

  const handleAddColumn = () => {
    const newColumn = {
      title: `${columnList.length - 3 + 1}º Padrao`,
      dataIndex: `${columnList.length - 3 + 1}º Padrao`,
      key: `${columnList.length - 3 + 1}`,
      canDelete: true,
      onHeaderCell: () => ({
        onMouseEnter: () => handleMouseEnter(newColumn.key),
        onMouseLeave: () => handleMouseLeave(newColumn.key),
      }),
    };
    setColumnList([
      ...columnList.slice(0, -2),
      newColumn,
      columnList.slice(-2)[0],
      columnList.slice(-1)[0]
    ]);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Button onClick={handleAddColumn}>Add Column</Button>
        
      </Menu.Item>
    </Menu>
  );

  const onChange = (activeKey) => {
    console.log(`onChange ${activeKey}`);
  };

  // const [deleteButtonVisible, setDeleteButtonVisible] = useState(
  //   columnList.map((col) => ({
  //     key: col.key,
  //     visible: false,
  //   }))
  // );

  // const handleMouseEnter = (key) => {
  //   setDeleteButtonVisible((prev) =>
  //     prev.map((item) => (item.key === key ? { ...item, visible: true } : item))
  //   );
  // };

  // const handleMouseLeave = (key) => {
  //   setDeleteButtonVisible((prev) =>
  //     prev.map((item) =>
  //       item.key === key ? { ...item, visible: false } : item
  //     )
  //   );
  // };

  return (
    <Collapse size="small" defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Dados da Injeção" key="1">
        <div style={{ padding: 16 }}>
          <Button
            onClick={handleAddColumn}
            overlay={menu}
            placement="bottomLeft"
            trigger={["click"]}
            size="small"
          >
            {" "}
            Add Column{" "}
          </Button>


          <br />
          <br />

          <Table
            dataSource={dataSource}
            columns={columnList}
            pagination={
              false
              // pageSize: paginationInfo.pageSize,
              // current: paginationInfo.current,
              // onChange: (page, pageSize) =>
              //   setPaginationInfo({ ...paginationInfo, current: page }),
            }
            scroll={{ x: "max-content" }}
            bordered
            size="small"
          />
        </div>
      </Panel>
    </Collapse>
  );
}

import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Input, Space, Table, Modal, Form, Descriptions, Switch, Row, Col   } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import MaquinaSwitch from "./switch.jsx";
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';
import { BsCircleFill } from 'react-icons/bs';
import { isIT, isQuality, isCollaborator } from '../../../view/components/hooks/hasPermissions.jsx';



const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const searchInput = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [newMachine, setNewMachine] = useState({});
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [machineDetails, setMachineDetails] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentMachineId, setCurrentMachineId] = useState(null);

  useEffect(() => {
    console.log("currentMachineId changed: ", currentMachineId);
}, [currentMachineId]);


    
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8080/api/maquinas/listar');
      // Adicionando uma propriedade 'key' a cada item.
      const dataWithKeys = result.data.map(item => ({...item, key: item.n_Maquina}));
      setData(dataWithKeys);
    };
    fetchData();
  }, []);

  const fetchMachineDetails = async (id) => {
    const result = await axios(`http://localhost:8080/api/maquinas/listar/${id}`);
    return result.data;
  };

  const handleMachineClick = async (id) => {
    const machineDetails = await fetchMachineDetails(id);
    setMachineDetails(machineDetails);
    setDetailsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.EstadoMaquina = 1;
      axios.post('http://localhost:8080/api/maquinas/adicionar', values)
      .then(function (response) {
        console.log(response);
        setIsModalVisible(false);
        form.resetFields();

        // Fetch data again after machine has been added
        axios.get('http://localhost:8080/api/maquinas/listar')
        .then(function (response) {
          setData(response.data.map((item) => ({ ...item, key: item.n_Maquina })));
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };



  const handleEdit = async () => {
    const values = await form.validateFields();
    values.EstadoMaquina = newMachine.EstadoMaquina;
    axios.put(`http://localhost:8080/api/maquinas/update/${currentMachineId}`, values)
    .then(function (response) {
      console.log(response);
      setEditModalVisible(false);
      form.resetFields();
  
      // Fetch data again after machine has been edited
      axios.get('http://localhost:8080/api/maquinas/listar')
      .then(function (response) {
        setData(response.data.map((item) => ({ ...item, key: item.n_Maquina })));
      })
      .catch(function (error) {
        console.log(error);
      });
      
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  

  const handleDelete = (id) => async () => {
    console.log("id: ", id)
    axios.delete(`http://localhost:8080/api/maquinas/delete/${id}`)
    .then(function (response) {
      console.log(response);
      Swal.close();
  
      // Fetch data again after machine has been deleted
      axios.get('http://localhost:8080/api/maquinas/listar')
      .then(function (response) {
        setData(response.data.map((item) => ({ ...item, key: item.n_Maquina })));
      })
      .catch(function (error) {
        console.log(error);
      });
  
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  

  const showDeleteConfirm = (id) => {
    console.log("id sweet: ", id);  
    setCurrentMachineId(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this machine?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id)();
      }
    })
  };
  


  const showEditModal = async (id) => {
    setCurrentMachineId(id);
    const machineDetails = await fetchMachineDetails(id);
    form.setFieldsValue(machineDetails); // set the form values to the current machine details
    setNewMachine({ ...machineDetails, EstadoMaquina: machineDetails.EstadoMaquina === 1 });
    setEditModalVisible(true);
  };
  
  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  let columns = [
    {
      title: "ID",
      dataIndex: "n_Maquina",
      key: "n_Maquina",
      width: "30%",
      ...getColumnSearchProps("n_Maquina"),
      render: (text, record) => (
        <a onClick={() => handleMachineClick(record.n_Maquina)}>{text}</a>
      ),
    },
    {
      title: "Brand/Model",
      dataIndex: "MarcaModelo",
      key: "MarcaModelo",
      width: "50%",
      ...getColumnSearchProps("MarcaModelo"),
      render: (text, record) => (
        <a onClick={() => handleMachineClick(record.n_Maquina)}>{text}</a>
      ),
    },
    {
      title: "Status",
      dataIndex: "EstadoMaquina",
      key: "EstadoMaquina",
      render: (estado) => estado === 1 ? 
      <BsCircleFill color="green" size="1.5em" /> :
      <BsCircleFill color="red" size="1.5em" />
    },
];

// Se o usuário não for um "Collaborator" ou "Quality", adicione a coluna de ações
if (!isCollaborator() && !isQuality()) {
    columns.push({
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <Space size="middle">
            <Button
              className="icon-button"
              onClick={() => showEditModal(record.n_Maquina)}
              icon={<i className="bi bi-pencil"></i>}
            ></Button>

            <Button
              className="icon-button"
              onClick={() => showDeleteConfirm(record.n_Maquina)}
              icon={<i className="bi bi-x-lg"></i>}
            ></Button>
          </Space>
        ),
    });
}
  return (
    <>
    <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        { 
      (!isCollaborator() && !isQuality()) && 
      <button
          className="btn btn-success icon-button-large p-2"
          onClick={() => setIsModalVisible(true)}
      >
        Add
        <i className="ml-2 bi bi-plus-lg"></i>
      </button> 
    }
      </Col>
      </Row>
    


      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>

      <Modal
        transitionName="zoom-fade"
        title="Add Machine"
        
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // Remove the default footer
        className="custom-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="MarcaModelo"
            label="Brand/Model"
            rules={[
              {
                required: true,
                message: "Please enter the brand/model of the machine",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setNewMachine({ ...newMachine, MarcaModelo: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="ForcaFecho"
            label="Closing Force"
            rules={[
              {
                required: true,
                message: "Please enter the closing force",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setNewMachine({ ...newMachine, ForcaFecho: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="DiametroFuso"
            label="Spindle Diameter"
            rules={[
              {
                required: true,
                message: "Please enter the spindle diameter",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setNewMachine({ ...newMachine, DiametroFuso: e.target.value })
              }
            />
          </Form.Item>
          <div className="modal-footer">
            <Button
              className="cancel-button"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </Button>
            <Button className="submit-button" type="primary" onClick={handleOk}>
              Add
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Machine Details"
        open={detailsModalVisible}
        onOk={() => setDetailsModalVisible(false)}
        onCancel={() => setDetailsModalVisible(false)}
        footer={null}
        maskClosable={true}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="ID">
            {machineDetails.n_Maquina}
          </Descriptions.Item>
          <Descriptions.Item label="Brand/Model">
            {machineDetails.MarcaModelo}
          </Descriptions.Item>
          <Descriptions.Item label="Closing Force">
            {machineDetails.ForcaFecho}
          </Descriptions.Item>
          <Descriptions.Item label="Spindle Diameter">
            {machineDetails.DiametroFuso}
          </Descriptions.Item>
          {/* Add other fields here as needed */}
        </Descriptions>
      </Modal>
      <Modal
        title="Edit Machine"
        open={editModalVisible}
        onOk={handleEdit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="MarcaModelo"
            label="Brand/Model"
            rules={[
              {
                required: true,
                message: "Please enter the brand/model of the machine",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ForcaFecho"
            label="Closing Force"
            rules={[
              {
                required: true,
                message: "Please enter the closing force",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ForcaFecho"
            label="Closing Force"
            rules={[
              {
                required: true,
                message: "Please enter the closing force",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="EstadoMaquina"
            label="Machine Status"
            valuePropName="checked" // ligar/desligar com base no valor booleano
          >
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Inactive"
              defaultChecked={true}
              onChange={(e) =>
                setNewMachine({ ...newMachine, EstadoMaquina: e ? 1 : 0 })
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Are you sure?"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        icon={<ExclamationCircleOutlined />}
        okText="Yes, delete"
        cancelText="No, cancel"
      >
        <p>Are you sure you want to delete this machine?</p>
      </Modal>
    </>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Button, Form, Select } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const formulario = () => {
  const [form] = Form.useForm();
  const [maquinas, setMaquinas] = useState([]);
  const [moldes, setMoldes] = useState([]);
  const [materiaPrima, setMateriaPrima] = useState([]);
  const history = useHistory();

  const handleNavigation = () => {
  history.push('/pages/preencher-PP');
};
const handleBackNavigation = () => {
  history.push('/pages/ParametrosPadrao');
};



useEffect(() => {
  axios.get('http://localhost:8080/api/listarppForm/ListMaquinas')
    .then(response => {
      setMaquinas(response.data.map(item => ({ id: item.n_Maquina, label: item.MarcaModelo })));
    });

  axios.get('http://localhost:8080/api/listarppForm/ListMoldes')
    .then(response => {
      setMoldes(response.data.map(item => ({ id: item.n_Molde, label: item.Descricao })));
    });

  axios.get('http://localhost:8080/api/listarppForm/ListMP')
    .then(response => {
      setMateriaPrima(response.data.map(item => ({ id: item.n_MateriaPrima, label: item.Descricao })));
    });
}, []);

  const onFinish = (values) => {
    console.log(values);
    history.push(`/pages/preencher-PP?maquina=${values.maquina}&molde=${values.molde}&materiaPrima=${values.materiaPrima}`);
};

  const onReset = () => {
    form.resetFields();
  };

  const refresh = () => window.location.reload(true);

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item name="maquina" label="Machines" rules={[{ required: false }]}>
        <Select placeholder="Select a Machine">
          {maquinas.map((machine, index) => (
            <Option key={index} value={machine.id}>
              {machine.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="molde" label="Mold" rules={[{ required: false }]}>
        <Select placeholder="Select a Mold">
          {moldes.map((molde, index) => (
            <Option key={index} value={molde.id}>
              {molde.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="materiaPrima"
        label="Raw Material"
        rules={[{ required: false }]}
      >
        <Select placeholder="Select a Raw Material">
          {materiaPrima.map((mp, index) => (
            <Option key={index} value={mp.id}>
              {mp.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Create 
        </Button>
        <Button onClick={handleBackNavigation}>Back</Button>
      </Form.Item>
    </Form>
  );
};

export default formulario;
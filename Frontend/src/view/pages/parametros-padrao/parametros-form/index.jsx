import React from "react";
import { Row, Col, Button, Form, Input, Select } from "antd";
import Formulario  from "./form"


function parametros_form() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>Default Parameter Form</h1>

          <Formulario  />

        </Col>
      </Row>
    </>
  );
}

export default parametros_form
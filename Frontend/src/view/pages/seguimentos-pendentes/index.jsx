import React from "react";
import { Row, Col, Button, Form, Input, Select } from "antd";
import ListarSeguimentos  from "./listar-seguimentos"


function listarSeguimentos() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>Follow-ups List</h1>

          <ListarSeguimentos  />

        </Col>
      </Row>
    </>
  );
}

export default listarSeguimentos
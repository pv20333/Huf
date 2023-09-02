import React from "react";
import { Row, Col, Button, Form, Input, Select } from "antd";
import DetalhesSeguimentos  from "./seguimentos-detalhes"


function listarSeguimentos() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          {/* <h1>Follow-ups Details</h1> */}

          <DetalhesSeguimentos  />

        </Col>
      </Row>
    </>
  );
}

export default listarSeguimentos
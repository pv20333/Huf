import React from "react";
import { Row, Col, Button, Form, Input, Select } from "antd";
import Detalhes  from "./detalhes"


function PPdetalhes() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>detalhes</h1>

          <Detalhes  />

        </Col>
      </Row>
    </>
  );
}

export default PPdetalhes
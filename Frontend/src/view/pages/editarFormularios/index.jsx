import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import Tabela from "./editar-formulario";

function testes() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>Edit Form</h1>
          <Tabela />
        </Col>
      </Row>
    </>
  );
}

export default testes;

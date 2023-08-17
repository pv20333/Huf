import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import Tabela from "./escolher-tabela";

function testes() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>Create Form</h1>
          <Tabela />
        </Col>
      </Row>
    </>
  );
}

export default testes;

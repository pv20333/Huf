import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import List from "./listColaboradores";

function testes() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>Employee List</h1>
          <List />
        </Col>
      </Row>
    </>
  );
}

export default testes;

import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import TabelaMP from "./listarMP";
import "./styles.css";

function maquinas() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1 className="centrar-texto">Raw Material</h1>

          <TabelaMP />
        </Col>
      </Row>
    </>
  );
}

export default maquinas
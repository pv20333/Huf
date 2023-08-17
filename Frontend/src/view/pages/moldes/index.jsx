import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import TabelaMoldes from "./listarMoldes";
import "./styles.css";

function maquinas() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1 className="centrar-texto">Molds</h1>

          <TabelaMoldes />
        </Col>
      </Row>
    </>
  );
}

export default maquinas
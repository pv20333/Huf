import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import Tabela from "./preencher-formulario";
import TabelaMoldes from "./tabelaMoldes";
import TabelaMP from "./tabelaMP";
import TabelaMaquinas from "./tabelaMaquinass"

function testes() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>Fill Default Parameter</h1>
          <Tabela />
        </Col>
      </Row>
    </>
  );
}

export default testes;

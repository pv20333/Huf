import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import TabelaParametrosPadrao from "./tabela-parametros-padrao";
import "./styles.css";
import Button from './button';


function parametros_padrao() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} >
          <h1 className="centrar-texto">Default Parameter</h1>
            
          <Button />
            <br />
          <TabelaParametrosPadrao />
        </Col>
      </Row>
    </>
  );
}

export default parametros_padrao
import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import TabelaParametrosPadrao from "./tabela-parametros-padrao";
import "./styles.css";
import Button from './button';
import { BrowserRouter } from 'react-router-dom';


function parametros_padrao() {
  return (
    <BrowserRouter>
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1 className="centrar-texto">Parametros Padrão</h1>
            
          <Button />
            <br />
            <br />
          <TabelaParametrosPadrao />
        </Col>
      </Row>
    </>
    </BrowserRouter>
  );
}

export default parametros_padrao
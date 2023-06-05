import React from "react";
import { Row, Col, Button, Form, Input, Select, Divider, Collapse } from "antd";
import DadosInjecao from "./tabela-dados-injecao"
import DadosMolde from "./tabela-dados-molde"
import DadosMaquina from "./tabela-dados-maquina"
import ParametrizacaoMaquinas from "./tabela-parametrizacao-maquina"
import ParametrizacaoMaquinas2 from "./tabela-parametrizacao-maquina2"
import ParametrizacaoMaquinas3 from "./tabela-parametrizacao-maquina3"
import ParametrizacaoMaquinas4 from "./tabela-parametrizacao-maquina4"
import DadosMaterial from "./tabela-dados-material"
import ResistenciaFuso from "./tabela-resistencia-fuso"
import CamarasQuentes from "./tabela-camaras-quentes"
import DadosFuso from "./tabela-dados-fuso"
import Tempos from "./tabela-tempos"
import CanaisMoldes from "./tabela-canais-moldes"
import Pesos from "./tabela-pesos"
import Humidade from "./tabela-humidade"

import "./styles.css"
const { Panel } = Collapse;

const onChange = (activeKey) => {
    console.log(`onChange ${activeKey}`);
  };

function criar_parametros_form() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1>criar form</h1>

          <DadosMolde />
          <Divider></Divider>
          <DadosMaquina />
          <Divider></Divider>
          <Collapse size="small" defaultActiveKey={["1"]} onChange={onChange}>
            <Panel header="Parametrização da Máquina" key="1">
              <ParametrizacaoMaquinas />
              <br />
              <ParametrizacaoMaquinas2 />
              <br />
              <ParametrizacaoMaquinas3 />
              <br />
              <ParametrizacaoMaquinas4 />
            </Panel>
          </Collapse>
          <Divider></Divider>
          <DadosMaterial />
          <Divider></Divider>
          <ResistenciaFuso />
          <Divider></Divider>
          <CamarasQuentes />
          <Divider></Divider>
          <DadosInjecao />
          <Divider></Divider>
          <DadosFuso />
          <Divider></Divider>
          <Tempos />
          <Divider></Divider>
          <CanaisMoldes />
          <Divider></Divider>
          <Pesos />
          <Divider></Divider>
          <Humidade />
        </Col>
      </Row>
    </>
  );
}

export default criar_parametros_form
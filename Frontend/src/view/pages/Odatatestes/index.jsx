import React from "react";
import { Row, Col } from "antd";
import PageContent from "../../../layout/components/content/page-content";
import Odata from "./data";


function odatatest() {
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24} className="text-center">
          <h1 className="centrar-texto">data</h1>

          < Odata/>
        </Col>
      </Row>
    </>
  );
}

export default odatatest
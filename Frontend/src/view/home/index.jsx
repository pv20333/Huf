import {React, useEffect} from "react";

import { Card, Col, Row } from "antd";

import PageTitle from "../../layout/components/content/page-title";

//linha para copiar para todos os index
import {isExpiredBoolean, validateToken} from '../pages/login/token'
//----------------------------------------

export default function Home() {
//comeca aqui o login
  validateToken()

  const response = isExpiredBoolean()
  console.log(response)
  if(response){
    console.log("alex")
    window.location.href = "/pages/login";
  }
//--------------------------------------------------
  
  return (
    <Row gutter={[32, 32]}>
      <PageTitle
        pageTitle="Home Page"
      />

      
    </Row>
  );
}

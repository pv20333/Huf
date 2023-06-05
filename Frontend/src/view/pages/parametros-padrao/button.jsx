//import React from 'react';
import { Button, Space } from 'antd';
import { Link } from "react-router-dom";

const Botao = () => {
    //const refresh = () => window.location.reload(true)
  return (
    <div>
      <Button type="primary" /*onClick={refresh}*/>
        <Link to="/pages/parametrospadrao/formulario">Criar Parâmetro Padrão</Link>
      </Button>
    </div>
  );
};

export default Botao;
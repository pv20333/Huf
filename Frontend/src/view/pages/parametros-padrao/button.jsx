import React from 'react';
import { Button, Space } from 'antd';
import { useHistory } from 'react-router-dom';

const Botao = () => {
    const history = useHistory();

    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      history.push("/pages/parametrospadrao/formulario");
  };
  
  

    return (
        <div>
            <Button type="primary" onClick={handleClick}>
                Create Default Parameter
            </Button>
        </div>
    );
};

export default Botao;

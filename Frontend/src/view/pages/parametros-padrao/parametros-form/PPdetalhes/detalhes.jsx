import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detalhes = () => {
  const { n_ParametroPadrao } = useParams();
  const [parametroPadrao, setParametroPadrao] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/renderizarpp/parametroPadrao/${n_ParametroPadrao}`);
        setParametroPadrao(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do ParametroPadrao: ", error);
      }
    };
    fetchData();
  }, [n_ParametroPadrao]); // Execute o efeito sempre que n_ParametroPadrao mudar

  // Renderizando
  if (!parametroPadrao) return <div>Carregando...</div>; // Exibir mensagem de carregamento enquanto os dados estão sendo buscados

  return (
    <div>
      Detalhes para o parametro padrao: {n_ParametroPadrao}
      {/* Aqui você pode renderizar os detalhes do ParametroPadrao como quiser */}
      {/* Por exemplo, se o ParametroPadrao tiver uma propriedade "descricao", você pode renderizá-la assim: */}
      <p>Descrição: {parametroPadrao.descricao}</p>
    </div>
  );
}

export default Detalhes;

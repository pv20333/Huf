import React from 'react';
import html2pdf from 'html2pdf.js';

const ComponenteImprimivel = ({ detalhesData }) => {
  const handlePrint = () => {
    const content = document.getElementById('conteudo-a-imprimir');
    const options = {
      margin: [20, 20, 20, 20], // Margens do PDF em pixels
      filename: 'detalhes.pdf', // Nome do arquivo PDF
      image: { type: 'jpeg', quality: 0.98 }, // Tipo e qualidade da imagem do PDF
      html2canvas: { scale: 2 }, // Configurações do html2canvas
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // Configurações do jsPDF
    };

    html2pdf().from(content).set(options).save();
  };

  return (
    <div>
      <h1>Detalhes do Parâmetro Padrão</h1>
      <p>Descrição: {detalhesData?.parametroPadrao?.descricao}</p>
      {/* Mais conteúdo aqui */}
      <button onClick={handlePrint}>Imprimir</button>
    </div>
  );
};

export default ComponenteImprimivel;

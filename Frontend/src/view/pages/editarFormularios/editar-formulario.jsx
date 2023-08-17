import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Table, Button } from "antd";

const { Option } = Select;

function RenderizarFormulario() {
  const [formularios, setFormularios] = useState([]);
  const [tabelas, setTabelas] = useState([]);
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [tabelasFormulario, setTabelasFormulario] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [prioridades, setPrioridades] = useState([]); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/editarformulario/formularios") // este retorna a lista de formularios
      .then((res) => {
        console.log("Resposta da API (Formulários):", res.data);
        setFormularios(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter formulários", error);
      });

    axios
      .get("http://localhost:8080/api/escolhertabela/tabelas-geral")
      .then((res) => {
        setTabelas(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter tabelas", error);
      });
  }, []);

  const handleFormularioChange = (value) => {
    setSelectedFormulario(value);
    axios
      .get(`http://localhost:8080/api/editarformulario/formularios/${value}`) //this ? sypostamente é este right? Ao selecionar um elemento vai buscar as tabelas deese form? o de cima vai buscar a lista dos formularios
      .then((res) => {
        console.log("Resposta da API (Tabelas do Formulário):", res.data);
        setTabelasFormulario(res.data);
      })
      .catch((error) => {
        console.error("Erro ao obter tabelas do formulário", error);
      });
  };

  const handleTableChange = (value) => {
    console.log('Selected table ID:', value);
    setSelectedTable(value);
  };
  
  function replaceKeyInObject(obj, oldKey, newKey) {
    let newObj = {};

    Object.keys(obj).forEach((key) => {
        if (key === oldKey) {
            newObj[newKey] = obj[key];
        } else {
            newObj[key] = obj[key];
        }
    });

    return newObj;
  }


  const handleAddTable = () => {
    console.log('Selected table ID before adding:', selectedTable);
    if (selectedTable) {
      axios
        .get(`http://localhost:8080/api/escolhertabela/colunas/${selectedTable}`)
        .then((res) => {
          const currentTimestamp = new Date().toISOString(); // Get the current timestamp in ISO format
          const selectedTabela = tabelas.find(tabela => tabela.n_TabelaGeral === selectedTable);
          
          let newObj = replaceKeyInObject(res.data, 'colunas', 'Colunas');
          
          console.log(".......");
          console.log(".......");
          console.log(".......");
          console.log(newObj); 

          const newTable = {
            ...selectedTabela,
            TabelaGeral: newObj,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            n_Formularios: selectedFormulario, // Add your logic here to set the correct value
            n_TabelaGeral: selectedTable,
            prioridade: tabelasFormulario.length + 1,
          };
          
          console.log("Antes do update");
          console.log(tabelasFormulario)
          console.log(newTable)
  
          setTabelasFormulario(prevTabelasFormulario => {
            const updatedTabelasFormulario = [...prevTabelasFormulario, newTable];
            console.log(updatedTabelasFormulario);
  
            setPrioridades(prevPrioridades => [...prevPrioridades, {tableId: newTable.n_TabelaGeral, prioridade: newTable.prioridade}]);
            
            return updatedTabelasFormulario;
          });

          console.log("Apos o update");
          console.log(tabelasFormulario)
  
          setSelectedTable(null);
        })
        .catch((error) => {
          console.error("Error while getting columns", error);
        });
    }
  };
  
  
  

  const handleGuardar = () => {
    const tabelasJaAdicionadas = new Set();
  
    // Log the original tabelasFormulario
    console.log("Original tabelasFormulario:", tabelasFormulario);
  
    axios
      .post(
        `http://localhost:8080/api/editarformulario/formularios/${selectedFormulario}/adicionar`,
        {
          tabelas: tabelasFormulario.map((table, index) => {
            if (!table) {
              console.error(`Tabela na posição ${index} não está definida`);
              return null;
            }
  
            // Log the value of n_TabelaGeral for each table
            console.log(`Valor de n_TabelaGeral para tabela na posição ${index}:`, table.n_TabelaGeral);
  
            if (!prioridades[index]) {
              console.error(`Prioridade na posição ${index} não está definida`);
              return null;
            }
  
            const id = table.n_TabelaGeral;
  
            if (tabelasJaAdicionadas.has(id)) {
              console.error(`Tabela com id ${id} já foi adicionada`);
              return null;
            }
  
            tabelasJaAdicionadas.add(id);
  
            return { id, prioridade: prioridades[index].prioridade };
          }).filter(Boolean)
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Erro ao guardar", error);
      });
  
    // Log the final tabelas array
    console.log("Final tabelas:", tabelasFormulario.map((table, index) => {
      return { id: table.n_TabelaGeral, prioridade: prioridades[index] ? prioridades[index].prioridade : null };
    }).filter(Boolean));
  };
  
  
  
  
  const handleRemoveTable = (tableId) => {
    axios
      .delete(
        `http://localhost:8080/api/editarformulario/formularios/${selectedFormulario}/tabelas/${tableId}`
      )
      .then((res) => {
        setTabelasFormulario(
          tabelasFormulario.filter((tabela) => tabela.n_TabelaGeral !== tableId)
        );
      })
      .catch((error) => {
        console.error("Erro ao remover tabela", error);
      });
  };

  const updatePrioridades = async (selectedFormulario, updatedPrioridades) => {
    try {
      for (const item of updatedPrioridades) {
        const response = await axios.put(`http://localhost:8080/api/editarformulario/prioridades/update`, {
          nformulario: selectedFormulario,  
          ntabela: item.tableId,
          prioridade: item.prioridade
        });
        if (response.status === 200) {
          console.log("Prioridade atualizada com sucesso para a tabela", item.tableId);
        } else {
          console.log("Erro ao atualizar a prioridade para a tabela", item.tableId);
        }
      }
    } catch (error) {
      console.log("Erro ao atualizar as prioridades", error);
    }
  };

  // const updatePrioridades = async (selectedFormulario, tableId, prioridade) => {
  //   try {
  //     const response = await axios.put(`http://localhost:8080/api/editarformulario/prioridades/update`, {
  //       nformulario: selectedFormulario,  
  //       ntabela: tableId,
  //       prioridade: prioridade
  //     });
  //     if (response.status === 200) {
  //       console.log("Prioridades atualizadas com sucesso");
  //     } else {
  //       console.log("Erro ao atualizar as prioridades");
  //     }
  //   } catch (error) {
  //     console.log("Erro ao atualizar as prioridades", error);
  //   }
  // };

  const handlePrioridadeChange = (tableId, prioridade) => {
    // Atualiza as prioridades localmente
    const updatedPrioridades = prioridades.map((item) => {
      if (item.tableId === tableId) {
        return { ...item, prioridade };
      } else if (item.prioridade >= prioridade) {
        return { ...item, prioridade: item.prioridade + 1 };
      } else {
        return item;
      }
    });
  
    setPrioridades(updatedPrioridades);
  
    // Atualiza as prioridades no servidor
    updatePrioridades(selectedFormulario, updatedPrioridades);
  };

  // const handlePrioridadeChange = (tableId, prioridade) => {
  //   // Ordena as tabelas pelo valor atual da prioridade
  //   const sortedPrioridades = [...prioridades].sort((a, b) => a.prioridade - b.prioridade);
  
  //   // Encontra a tabela que está sendo alterada
  //   const tabelaAlterada = sortedPrioridades.find((item) => item.tableId === tableId);
  
  //   if (tabelaAlterada) {
  //     const tabelaAnterior = sortedPrioridades[prioridade - 1]; // Tabela com a prioridade que a tabela alterada será movida
  //     const maxPrioridade = sortedPrioridades.length + 1; // Número máximo de tabelas no formulário
  
  //     // Atualiza as prioridades localmente
  //     const updatedPrioridades = sortedPrioridades.map((item) => {
  //       if (item.tableId === tableId) {
  //         return { ...item, prioridade };
  //       } else if (item.prioridade < tabelaAlterada.prioridade && item.prioridade >= prioridade) {
  //         return { ...item, prioridade: item.prioridade + 1 };
  //       } else if (item.prioridade > tabelaAlterada.prioridade && item.prioridade <= prioridade) {
  //         return { ...item, prioridade: item.prioridade - 1 };
  //       } else {
  //         return item;
  //       }
  //     });
  
  //     // Atualiza a prioridade da tabela movida
  //     const tabelaAtualizada = updatedPrioridades.find((item) => item.tableId === tableId);
  
  //     if (tabelaAtualizada) {
  //       tabelaAtualizada.prioridade = prioridade;
  //     }
  
  //     // Atualiza as prioridades no servidor
  //     updatePrioridades(selectedFormulario, updatedPrioridades);
  //   }
  // };
  
  
  

  // const handlePrioridadeChange = (tableId, prioridade) => {
  //   // Atualiza as prioridades localmente
  //   const updatedPrioridades = prioridades.map((item) => {
  //     if (item.tableId === tableId) {
  //       return { ...item, prioridade };
  //     } else if (item.prioridade >= prioridade) {
  //       return { ...item, prioridade: item.prioridade + 1 };
  //     } else {
  //       return item;
  //     }
  //   });

  //   console.log("Im going to update: " + tableId + " " + prioridade  + " for form: " + selectedFormulario);

  //   setPrioridades(updatedPrioridades);

  //   // Atualiza as prioridades no servidor
  //   updatePrioridades(selectedFormulario, tableId, prioridade);
  // };

  useEffect(() => {
    const newPrioridades = tabelasFormulario.map((tabela, index) => ({
      tableId: tabela.n_TabelaGeral,
      prioridade: index + 1,
    }));
    setPrioridades(newPrioridades);
  }, [tabelasFormulario]);


  console.log(tabelasFormulario)


  
  

  return (
    <div>
      <h1>Choose a Form</h1>
      <Select style={{ width: 200 }} onChange={handleFormularioChange}>
        {formularios.map((formulario) => (
          <Option
            key={formulario.n_Formularios}
            value={formulario.n_Formularios}
          >
            {formulario.designacao}
          </Option>
        ))}
      </Select>

      
      {tabelasFormulario.map((tabela, index) => {
        console.log("Renderizando tabela:", tabela);

                // DEBUG: Imprima o valor de tabela.TabelaGeral.Colunas
        console.log("Colunas para esta tabela:", tabela?.TabelaGeral?.Colunas);

        // DEBUG: Imprima o número de linhas para esta tabela
        console.log("Número de linhas para esta tabela:", tabela?.TabelaGeral?.numero_linhas);
        return (
          <div key={index} style={{ marginBottom: "20px" }}>
            <Table
              columns={tabela?.TabelaGeral?.Colunas?.map((coluna) => {
                console.log("Processing column:", coluna);
                return {
                  title: coluna.TituloColunas,
                  dataIndex: coluna.TituloColunas,
                  key: coluna.n_TabelaColunas
                }
              }) ?? []}

              dataSource={Array.from(
                { length: tabela?.TabelaGeral?.numero_linhas ?? 0 },
                (_, i) => ({
                  key: i
                })
              )}
              pagination={false}
            />
            <Button onClick={() => handleRemoveTable(tabela.n_TabelaGeral)}>
              Remove Table
            </Button>
            <Select
              style={{ width: 100 }}
              value={
                prioridades.find((item) => item.tableId === tabela.n_TabelaGeral)
                  ?.prioridade
              }
              onChange={(value) =>
                handlePrioridadeChange(tabela.n_TabelaGeral, value)
              }
            >
              {prioridades.map((_, index) => (
                <Option key={index + 1} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>
          </div>
        );
        
        })}
        <Select style={{ width: 200 }} onChange={handleTableChange}>
  {tabelas.map((tabela) => {
    console.log('Table ID in Select:', tabela.n_TabelaGeral); // Add this line
    return (
      <Option key={tabela.n_TabelaGeral} value={tabela.n_TabelaGeral}>
        {tabela.designacao}
      </Option>
    );
  })}
</Select>

        <Button onClick={handleAddTable}>Add Table</Button>
        <Button onClick={handleGuardar}>Save</Button>
        </div>
        );
        
}

export default RenderizarFormulario;

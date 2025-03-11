import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PrimeiraEtapa from './components/cadastro/PrimeiraEtapa';
import SegundaEtapa from './components/cadastro/SegundaEtapa';
import ConfirmacaoCadastro from './components/cadastro/ConfirmacaoCadastro';

function App() {
  // Estado global para armazenar dados do usuário entre etapas
  const [dadosUsuario, setDadosUsuario] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    cpf: '',
    telefoneCelular: ''
  });

  // Função para atualizar dados parcialmente
  const atualizarDados = (novoDados) => {
    setDadosUsuario(prev => ({ ...prev, ...novoDados }));
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PrimeiraEtapa 
              dadosUsuario={dadosUsuario} 
              atualizarDados={atualizarDados} 
            />
          } />
          <Route path="/etapa2" element={
            <SegundaEtapa 
              dadosUsuario={dadosUsuario} 
              atualizarDados={atualizarDados} 
            />
          } />
          <Route path="/confirmacao" element={
            <ConfirmacaoCadastro 
              dadosUsuario={dadosUsuario} 
            />
          } />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
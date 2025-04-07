import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PrimeiraEtapa from './components/cadastro/PrimeiraEtapa';
import SegundaEtapa from './components/cadastro/SegundaEtapa';
import ConfirmacaoCadastro from './components/cadastro/ConfirmacaoCadastro';
// Importando o novo componente simplificado
import EnderecoTemp from './components/cadastro/EnderecoTemp';
import LoginEmail from './components/autenticacao/LoginEmail';
import AutenticacaoSms from "./components/autenticacao/LoginSMS";





function App() {
  const [dadosUsuario, setDadosUsuario] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    cpf: '',
    telefoneCelular: ''
  });

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
          {/* Usando o novo componente temporário */}
          <Route path="/cadastro-endereco" element={<EnderecoTemp />} />
          <Route path="/login-email" element={<LoginEmail />} />
          <Route path="/login-sms" element={<AutenticacaoSms />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
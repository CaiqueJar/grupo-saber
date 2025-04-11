import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import PrimeiraEtapa from './components/cadastro/PrimeiraEtapa';
import SegundaEtapa from './components/cadastro/SegundaEtapa';
import ConfirmacaoCadastro from './components/cadastro/ConfirmacaoCadastro';
import EnderecoTemp from './components/cadastro/EnderecoTemp';
import LoginEmail from './components/autenticacao/LoginEmail';
import AutenticacaoSms from "./components/autenticacao/LoginSMS";
import CadastroRestaurante from './components/CadastroRestaurante/CadastroRestaurante';
import CadastroRestauranteDados from './components/cadastroRestaurante/CadastroRestauranteDados';
import VerificacaoEmailRestaurante from './components/cadastroRestaurante/VerificacaoEmailRestaurante';
import CadastroEnderecoRestaurante from "./components/cadastroRestaurante/CadastroEnderecoRestaurante";
import VerificacaoCNPJ from "./components/cadastroRestaurante/VerificacaoCNPJ";
import EspecialidadeRestaurante from "./components/cadastroRestaurante/EspecialidadeRestaurante";





function App() {
  const [dadosUsuario, setDadosUsuario] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    cpf: '',
    telefoneCelular: ''
  });

  const [dadosRestaurante, setDadosRestaurante] = useState({
    email: '',
    nomeRestaurante: '',
    cnpj: '',
    telefone: '',
    senha: ''
  });

  const atualizarDadosUsuario = (novoDados) => {
    setDadosUsuario(prev => ({ ...prev, ...novoDados }));
  };

  const atualizarDadosRestaurante = (novoDados) => {
    setDadosRestaurante(prev => ({ ...prev, ...novoDados }));
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {/* Cadastro de usuário */}
          <Route path="/" element={
            <PrimeiraEtapa 
              dadosUsuario={dadosUsuario} 
              atualizarDados={atualizarDadosUsuario} 
            />
          } />
          <Route path="/etapa2" element={
            <SegundaEtapa 
              dadosUsuario={dadosUsuario} 
              atualizarDados={atualizarDadosUsuario} 
            />
          } />
          <Route path="/confirmacao" element={
            <ConfirmacaoCadastro 
              dadosUsuario={dadosUsuario} 
            />
          } />
          <Route path="/cadastro-endereco" element={<EnderecoTemp />} />
          <Route path="/login-email" element={<LoginEmail />} />
          <Route path="/login-sms" element={<AutenticacaoSms />} />

          {/* Cadastro de restaurante */}
          <Route path="/cadastro-restaurante" element={
            <CadastroRestaurante
              dadosRestaurante={dadosRestaurante}
              atualizarDados={atualizarDadosRestaurante}
            />
          } />

          <Route path="/cadastro-restaurante-dados" element={
            <CadastroRestauranteDados
              dadosRestaurante={dadosRestaurante}
              atualizarDados={atualizarDadosRestaurante}
            />
          } />

          <Route path="/verificacao-email-restaurante" element={
            <VerificacaoEmailRestaurante dadosRestaurante={dadosRestaurante} />
          } />

          <Route path="/cadastro-endereco-restaurante" element={
            <CadastroEnderecoRestaurante dadosRestaurante={dadosRestaurante} />
          } />

          <Route path="/verificacao-cnpj" element={
            <VerificacaoCNPJ dadosRestaurante={dadosRestaurante} />
          } />

          <Route path="/cadastro/restaurante/proxima-etapa" element={
            <EspecialidadeRestaurante dadosRestaurante={dadosRestaurante} />
          } />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

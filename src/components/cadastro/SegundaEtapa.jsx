import { 
    Box, Button, Flex, FormControl, FormLabel, Heading, Input, VStack, Image, 
    useToast, InputGroup, InputRightElement, FormHelperText
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useNavigate } from 'react-router-dom';
  import { usuarioService } from '../../services/api';
  import logo from "../../images/logo.png";
  
  const SegundaEtapa = ({ dadosUsuario, atualizarDados }) => {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSenhaToggle = () => setMostrarSenha(!mostrarSenha);
  
    const validarCPF = (cpf) => {
      // Remover caracteres não numéricos
      cpf = cpf.replace(/[^\d]/g, '');
      
      // Verificar se tem 11 dígitos
      return cpf.length === 11;
    };
  
    const validarTelefone = (telefone) => {
      // Remover caracteres não numéricos
      telefone = telefone.replace(/[^\d]/g, '');
      
      // Verificar se tem entre 10 e 11 dígitos
      return telefone.length >= 10 && telefone.length <= 11;
    };
  
    const handleSubmit = async () => {
      // Validar senha
      if (!dadosUsuario.senha || dadosUsuario.senha.length < 6) {
        toast({
          title: "Senha inválida!",
          description: "A senha deve ter pelo menos 6 caracteres.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      // Validar CPF
      if (!validarCPF(dadosUsuario.cpf)) {
        toast({
          title: "CPF inválido!",
          description: "Por favor, insira um CPF válido com 11 dígitos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      // Validar telefone
      if (!validarTelefone(dadosUsuario.telefoneCelular)) {
        toast({
          title: "Telefone inválido!",
          description: "Por favor, insira um número de telefone válido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      try {
        setIsLoading(true);
        
        // Formatando CPF e telefone para remover caracteres não numéricos
        const dadosFormatados = {
          ...dadosUsuario,
          cpf: dadosUsuario.cpf.replace(/[^\d]/g, ''),
          telefoneCelular: dadosUsuario.telefoneCelular.replace(/[^\d]/g, '')
        };
        
        // Enviar dados para API
        await usuarioService.cadastrar(dadosFormatados);
        
        toast({
          title: "Cadastro realizado!",
          description: "Seus dados foram cadastrados com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Navegar para tela de confirmação
        navigate('/confirmacao');
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
        toast({
          title: "Erro no cadastro!",
          description: error.response?.data || "Ocorreu um erro ao cadastrar.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Flex
        h="100vh"
        align="center"
        justify="center"
        bg="linear-gradient(to right, #f0f8ff, #cce7ff)"
        p={4}
      >
        <Flex
          w={{ base: "90%", md: "600px" }}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          p={8}
          direction="column"
        >
          <Box textAlign="center" mb={8}>
            <Image 
              src={logo} 
              alt="Grupo Saber" 
              boxSize="100px" 
              mx="auto"
              mb={4}
            />
            <Heading size="lg" color="gray.700">
              Complete seu cadastro
            </Heading>
            <Box fontSize="md" color="gray.500" mt={2}>
              Precisamos de mais algumas informações
            </Box>
          </Box>
          
          <VStack spacing={6} w="100%">
            <FormControl isRequired>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  type={mostrarSenha ? "text" : "password"}
                  value={dadosUsuario.senha}
                  onChange={(e) => atualizarDados({ senha: e.target.value })}
                  placeholder="Crie uma senha"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleSenhaToggle}>
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>A senha deve ter pelo menos 6 caracteres</FormHelperText>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>CPF</FormLabel>
              <Input
                value={dadosUsuario.cpf}
                onChange={(e) => atualizarDados({ cpf: e.target.value })}
                placeholder="Digite seu CPF"
                maxLength={14}
              />
              <FormHelperText>Apenas números, 11 dígitos</FormHelperText>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Telefone Celular</FormLabel>
              <Input
                value={dadosUsuario.telefoneCelular}
                onChange={(e) => atualizarDados({ telefoneCelular: e.target.value })}
                placeholder="Digite seu telefone celular"
                maxLength={15}
              />
              <FormHelperText>Formato: (DDD) + número</FormHelperText>
            </FormControl>
            
            <Button 
              colorScheme="blue" 
              w="100%" 
              size="lg" 
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Cadastrando..."
            >
              Finalizar Cadastro
            </Button>
            
            <Button 
              variant="outline" 
              w="100%" 
              onClick={() => navigate('/')}
            >
              Voltar
            </Button>
          </VStack>
        </Flex>
      </Flex>
    );
  };
  
  export default SegundaEtapa;
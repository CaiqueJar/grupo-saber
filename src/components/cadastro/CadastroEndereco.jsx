import { 
  Box, Button, Flex, FormControl, FormLabel, Heading, Input, VStack, 
  Image, FormErrorMessage, useToast, InputGroup, Select, Text
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../../images/logo.png";

const CadastroEndereco = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  // Estado para controlar erros no componente
  const [componentError, setComponentError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Conteúdo do componente com tratamento de erro
  const ComponentContent = () => {
    try {
      const location = useLocation();
      const usuario = location.state?.usuario || {};
      const [isLoading, setIsLoading] = useState(false);
      
      // Estado para os campos do endereço
      const [endereco, setEndereco] = useState({
        usuarioId: usuario.id || '',
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        pontoReferencia: ""
      });

      // Estado para controlar erros de validação
      const [erros, setErros] = useState({});

      // Função para atualizar o estado do endereço
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEndereco({
          ...endereco,
          [name]: value
        });
        
        // Limpar o erro deste campo quando o usuário alterar o valor
        if (erros[name]) {
          setErros({
            ...erros,
            [name]: null
          });
        }
      };

      // Função para buscar endereço pelo CEP
      const buscarEnderecoPorCEP = async () => {
        if (!endereco.cep || endereco.cep.length !== 8) {
          setErros({
            ...erros,
            cep: "CEP inválido. Digite 8 dígitos."
          });
          return;
        }

        setIsLoading(true);
        try {
          const response = await fetch(`https://viacep.com.br/ws/${endereco.cep}/json/`);
          const data = await response.json();
          
          if (data.erro) {
            setErros({
              ...erros,
              cep: "CEP não encontrado."
            });
          } else {
            setEndereco({
              ...endereco,
              rua: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            });
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          toast({
            title: "Erro ao buscar CEP",
            description: "Ocorreu um erro ao buscar o endereço pelo CEP.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      };

      // Função para validar formulário antes de enviar
      const validarFormulario = () => {
        const novosErros = {};
        
        if (!endereco.cep || endereco.cep.length !== 8) {
          novosErros.cep = "CEP inválido. Digite 8 dígitos.";
        }
        
        if (!endereco.rua) {
          novosErros.rua = "Rua é obrigatória.";
        }
        
        if (!endereco.numero) {
          novosErros.numero = "Número é obrigatório.";
        }
        
        if (!endereco.bairro) {
          novosErros.bairro = "Bairro é obrigatório.";
        }
        
        if (!endereco.cidade) {
          novosErros.cidade = "Cidade é obrigatória.";
        }
        
        if (!endereco.estado || endereco.estado.length !== 2) {
          novosErros.estado = "Estado inválido.";
        }
        
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
      };

      // Função para enviar o formulário
      const handleSubmit = async () => {
        if (!validarFormulario()) {
          toast({
            title: "Formulário inválido",
            description: "Por favor, preencha todos os campos obrigatórios corretamente.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

        setIsLoading(true);
        try {
          // Aqui você enviaria os dados para sua API
          const response = await fetch('http://localhost:8080/api/enderecos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(endereco),
          });

          if (!response.ok) {
            throw new Error('Erro ao cadastrar endereço');
          }

          toast({
            title: "Endereço cadastrado!",
            description: "Seu endereço foi cadastrado com sucesso.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          
          // Navegar para a próxima página ou para a home
          navigate('/');
        } catch (error) {
          console.error("Erro ao cadastrar endereço:", error);
          toast({
            title: "Erro no cadastro",
            description: "Ocorreu um erro ao cadastrar seu endereço.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      };

      // Lista de estados brasileiros
      const estados = [
        { sigla: "AC", nome: "Acre" },
        { sigla: "AL", nome: "Alagoas" },
        { sigla: "AP", nome: "Amapá" },
        { sigla: "AM", nome: "Amazonas" },
        { sigla: "BA", nome: "Bahia" },
        { sigla: "CE", nome: "Ceará" },
        { sigla: "DF", nome: "Distrito Federal" },
        { sigla: "ES", nome: "Espírito Santo" },
        { sigla: "GO", nome: "Goiás" },
        { sigla: "MA", nome: "Maranhão" },
        { sigla: "MT", nome: "Mato Grosso" },
        { sigla: "MS", nome: "Mato Grosso do Sul" },
        { sigla: "MG", nome: "Minas Gerais" },
        { sigla: "PA", nome: "Pará" },
        { sigla: "PB", nome: "Paraíba" },
        { sigla: "PR", nome: "Paraná" },
        { sigla: "PE", nome: "Pernambuco" },
        { sigla: "PI", nome: "Piauí" },
        { sigla: "RJ", nome: "Rio de Janeiro" },
        { sigla: "RN", nome: "Rio Grande do Norte" },
        { sigla: "RS", nome: "Rio Grande do Sul" },
        { sigla: "RO", nome: "Rondônia" },
        { sigla: "RR", nome: "Roraima" },
        { sigla: "SC", nome: "Santa Catarina" },
        { sigla: "SP", nome: "São Paulo" },
        { sigla: "SE", nome: "Sergipe" },
        { sigla: "TO", nome: "Tocantins" }
      ];

      return (
        <Flex
          h="100vh"
          align="center"
          justify="center"
          bg="linear-gradient(to right, #f0f8ff, #cce7ff)"
          p={4}
        >
          <Flex
            w={{ base: "90%", md: "700px" }}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            p={8}
            direction="column"
          >
            <Box textAlign="center" mb={6}>
              <Image 
                src={logo} 
                alt="Grupo Saber" 
                boxSize="100px" 
                mx="auto"
                mb={4}
              />
              <Heading size="lg" color="gray.700">
                Cadastro de Endereço
              </Heading>
              <Box fontSize="md" color="gray.500" mt={2}>
                Complete seu cadastro informando seu endereço
              </Box>
            </Box>
            
            <VStack spacing={4} w="100%">
              <Flex w="100%" gap={4}>
                <FormControl isRequired isInvalid={erros.cep}>
                  <FormLabel>CEP</FormLabel>
                  <InputGroup>
                    <Input
                      name="cep"
                      value={endereco.cep}
                      onChange={handleChange}
                      placeholder="Digite o CEP"
                      maxLength={8}
                      onBlur={buscarEnderecoPorCEP}
                    />
                  </InputGroup>
                  {erros.cep && <FormErrorMessage>{erros.cep}</FormErrorMessage>}
                </FormControl>
                
                <Button 
                  mt={8} 
                  colorScheme="blue" 
                  onClick={buscarEnderecoPorCEP}
                  isLoading={isLoading}
                  loadingText="Buscando..."
                >
                  Buscar CEP
                </Button>
              </Flex>
              
              <FormControl isRequired isInvalid={erros.rua}>
                <FormLabel>Rua</FormLabel>
                <Input
                  name="rua"
                  value={endereco.rua}
                  onChange={handleChange}
                  placeholder="Digite o nome da rua"
                />
                {erros.rua && <FormErrorMessage>{erros.rua}</FormErrorMessage>}
              </FormControl>
              
              <Flex w="100%" gap={4}>
                <FormControl isRequired isInvalid={erros.numero} w="30%">
                  <FormLabel>Número</FormLabel>
                  <Input
                    name="numero"
                    value={endereco.numero}
                    onChange={handleChange}
                    placeholder="Nº"
                  />
                  {erros.numero && <FormErrorMessage>{erros.numero}</FormErrorMessage>}
                </FormControl>
                
                <FormControl w="70%">
                  <FormLabel>Complemento</FormLabel>
                  <Input
                    name="complemento"
                    value={endereco.complemento}
                    onChange={handleChange}
                    placeholder="Apartamento, bloco, etc."
                  />
                </FormControl>
              </Flex>
              
              <FormControl isRequired isInvalid={erros.bairro}>
                <FormLabel>Bairro</FormLabel>
                <Input
                  name="bairro"
                  value={endereco.bairro}
                  onChange={handleChange}
                  placeholder="Digite o bairro"
                />
                {erros.bairro && <FormErrorMessage>{erros.bairro}</FormErrorMessage>}
              </FormControl>
              
              <Flex w="100%" gap={4}>
                <FormControl isRequired isInvalid={erros.cidade} flex={2}>
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    name="cidade"
                    value={endereco.cidade}
                    onChange={handleChange}
                    placeholder="Digite a cidade"
                  />
                  {erros.cidade && <FormErrorMessage>{erros.cidade}</FormErrorMessage>}
                </FormControl>
                
                <FormControl isRequired isInvalid={erros.estado} flex={1}>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    name="estado"
                    value={endereco.estado}
                    onChange={handleChange}
                    placeholder="Selecione"
                  >
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {estado.sigla} - {estado.nome}
                      </option>
                    ))}
                  </Select>
                  {erros.estado && <FormErrorMessage>{erros.estado}</FormErrorMessage>}
                </FormControl>
              </Flex>
              
              <FormControl>
                <FormLabel>Ponto de Referência</FormLabel>
                <Input
                  name="pontoReferencia"
                  value={endereco.pontoReferencia}
                  onChange={handleChange}
                  placeholder="Ex: Próximo à farmácia"
                />
              </FormControl>
              
              <Button 
                colorScheme="blue" 
                w="100%" 
                size="lg" 
                mt={6}
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
    } catch (error) {
      console.error("Erro no componente CadastroEndereco:", error);
      setComponentError(true);
      setErrorMessage(error.message || "Ocorreu um erro ao carregar a página");
      return null;
    }
  };

  // Use useEffect para garantir que tratamos erros durante a renderização também
  useEffect(() => {
    try {
      // Apenas para capturar erros na inicialização do componente
    } catch (error) {
      console.error("Erro na inicialização do componente:", error);
      setComponentError(true);
      setErrorMessage(error.message || "Ocorreu um erro ao inicializar a página");
    }
  }, []);

  // Se houver erro, mostre uma tela de erro
  if (componentError) {
    return (
      <Flex
        h="100vh"
        align="center"
        justify="center"
        bg="linear-gradient(to right, #f0f8ff, #cce7ff)"
      >
        <Box p={8} bg="white" borderRadius="md" textAlign="center" boxShadow="lg">
          <Heading size="md" mb={4} color="red.500">Ocorreu um erro ao carregar a página</Heading>
          <Text mb={4}>{errorMessage}</Text>
          <Button onClick={() => navigate('/')} colorScheme="blue">
            Voltar para o início
          </Button>
        </Box>
      </Flex>
    );
  }

  // Renderize o conteúdo do componente
  return <ComponentContent />;
};

export default CadastroEndereco;
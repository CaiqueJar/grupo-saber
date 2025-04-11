import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  HStack,
  useToast,
  Progress
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CadastroEnderecoRestaurante = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const restaurante = location.state?.restaurante || {};

  const [endereco, setEndereco] = useState({
    restauranteId: restaurante.id || "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  const [erros, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco({ ...endereco, [name]: value });

    if (erros[name]) {
      setErros({ ...erros, [name]: null });
    }
  };

  const buscarEnderecoPorCEP = async () => {
    const cepLimpo = endereco.cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setErros({ ...erros, cep: "CEP inválido. Digite 8 dígitos." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErros({ ...erros, cep: "CEP não encontrado." });
      } else {
        setEndereco((prev) => ({
          ...prev,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Não foi possível buscar o endereço.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!endereco.cep || endereco.cep.length < 8) novosErros.cep = "CEP obrigatório.";
    if (!endereco.rua) novosErros.rua = "Rua obrigatória.";
    if (!endereco.numero) novosErros.numero = "Número obrigatório.";
    if (!endereco.bairro) novosErros.bairro = "Bairro obrigatório.";
    if (!endereco.cidade) novosErros.cidade = "Cidade obrigatória.";
    if (!endereco.estado) novosErros.estado = "Estado obrigatório.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) {
      toast({
        title: "Formulário incompleto",
        description: "Preencha todos os campos obrigatórios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      

      const response = await fetch("http://localhost:8080/api/enderecos-restaurantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endereco),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Endereço salvo com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      

      navigate("/verificacao-cnpj");
    } catch (err) {
      toast({
        
        title: "Erro ao salvar endereço",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-b, #d0e1f9, #4a708b)" px={4}>
      <Box bg="white" p={10} rounded="md" shadow="lg" w="100%" maxW="700px">
        {/* Barra de progresso fake */}
        <Progress value={33} size="xs" colorScheme="red" borderRadius="full" mb={6} />

        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Cadastre o endereço do restaurante!
        </Text>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Agora precisamos de mais algumas informações:
        </Text>

        <VStack spacing={4} align="stretch">
          <FormControl isRequired isInvalid={erros.cep}>
            <FormLabel>CEP</FormLabel>
            <Input
              name="cep"
              value={endereco.cep}
              onChange={handleChange}
              placeholder="Digite o CEP"
              onBlur={buscarEnderecoPorCEP}
              maxW="300px"
              mx="auto"
              display="block"
            />
          </FormControl>

          <FormControl isRequired isInvalid={erros.rua}>
            <FormLabel>Rua</FormLabel>
            <Input
              name="rua"
              value={endereco.rua}
              onChange={handleChange}
              placeholder="Digite a rua"
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl isRequired isInvalid={erros.numero}>
              <FormLabel>Número</FormLabel>
              <Input
                name="numero"
                value={endereco.numero}
                onChange={handleChange}
                placeholder="Número"
              />
            </FormControl>

            <FormControl isInvalid={erros.complemento}>
              <FormLabel>Complemento</FormLabel>
              <Input
                name="complemento"
                value={endereco.complemento}
                onChange={handleChange}
                placeholder="Complemento"
              />
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl isRequired isInvalid={erros.bairro}>
              <FormLabel>Bairro</FormLabel>
              <Input
                name="bairro"
                value={endereco.bairro}
                onChange={handleChange}
                placeholder="Bairro"
              />
            </FormControl>

            <FormControl isRequired isInvalid={erros.cidade}>
              <FormLabel>Cidade</FormLabel>
              <Input
                name="cidade"
                value={endereco.cidade}
                onChange={handleChange}
                placeholder="Cidade"
              />
            </FormControl>
          </HStack>

          <FormControl isRequired isInvalid={erros.estado}>
            <FormLabel>Estado</FormLabel>
            <Input
              name="estado"
              value={endereco.estado}
              onChange={handleChange}
              placeholder="Estado"
              maxW="200px"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            w="full"
            mt={4}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Continuar
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default CadastroEnderecoRestaurante;

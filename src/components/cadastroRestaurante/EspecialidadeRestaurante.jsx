import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
  useToast,
  Input,
  Progress,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EspecialidadeRestaurante = () => {
  const [especialidade, setEspecialidade] = useState("");
  const [nomeLoja, setNomeLoja] = useState("");
  const [erros, setErros] = useState({ nomeLoja: false, especialidade: false });
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = () => {
    const novosErros = {
      nomeLoja: nomeLoja.trim() === "",
      especialidade: especialidade === "",
    };

    setErros(novosErros);

    if (novosErros.nomeLoja || novosErros.especialidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log("Nome da loja:", nomeLoja);
    console.log("Especialidade selecionada:", especialidade);
    navigate("/finalizacao-cadastro"); // Altere conforme necessário
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-b, #d0e1f9, #4a708b)" px={4}>
      <Box bg="white" p={10} rounded="md" shadow="lg" w="100%" maxW="700px">
        {/* Barra de progresso no topo */}
        <Progress value={75} size="xs" colorScheme="yellow" borderRadius="full" mb={6} />

        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Agora, nos fale mais sobre seu negócio
        </Text>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Preencha os campos abaixo:
        </Text>

        <VStack spacing={4} align="stretch">
          <FormControl isRequired isInvalid={erros.nomeLoja}>
            <FormLabel>Nome da Loja</FormLabel>
            <Input
              placeholder="Digite o nome da loja"
              value={nomeLoja}
              onChange={(e) => {
                setNomeLoja(e.target.value);
                setErros((prev) => ({ ...prev, nomeLoja: false }));
              }}
            />
          </FormControl>

          <FormControl isRequired isInvalid={erros.especialidade}>
            <FormLabel>Especialidade</FormLabel>
            <Select
              placeholder="Selecione"
              value={especialidade}
              onChange={(e) => {
                setEspecialidade(e.target.value);
                setErros((prev) => ({ ...prev, especialidade: false }));
              }}
            >
              <option value="Pizza">Pizza</option>
              <option value="Hamburguer">Hamburguer</option>
              <option value="Sushi">Sushi</option>
              <option value="Comida Brasileira">Comida Brasileira</option>
              <option value="Sobremesas">Sobremesas</option>
            </Select>
          </FormControl>

          <Button colorScheme="blue" onClick={handleSubmit}>
            Finalizar Cadastro
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default EspecialidadeRestaurante;

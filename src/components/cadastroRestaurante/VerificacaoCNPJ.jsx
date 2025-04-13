import {
    Box,
    Button,
    Flex,
    Text,
    VStack,
    Progress
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  
  const VerificacaoCNPJ = () => {
    const navigate = useNavigate();
  
    const handleResposta = (possuiCNPJ) => {
      if (possuiCNPJ === true) {
        navigate("/cadastro/restaurante/cnpj");
      } else {
        navigate("/cadastro/restaurante/proxima-etapa");
      }
    };
  
    return (
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bgGradient="linear(to-b, #d0e1f9, #4a708b)"
        px={4}
      >
        <Box
          bg="white"
          p={10}
          rounded="md"
          shadow="lg"
          w="100%"
          maxW="700px"
          textAlign="center"
        >
          {/* Barra de progresso fake */}
          <Progress value={55} size="xs" colorScheme="yellow" borderRadius="full" mb={6} />
  
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            A sua loja possui CNPJ?
          </Text>
          <Text fontSize="sm" color="gray.600" mb={6}>
            Essa informação nos ajuda a validar melhor o seu restaurante.
          </Text>
  
          <VStack spacing={4}>
            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              onClick={() => handleResposta(true)}
            >
              Sim
            </Button>
            <Button
              colorScheme="gray"
              size="lg"
              w="full"
              onClick={() => handleResposta(false)}
            >
              Não
            </Button>
          </VStack>
        </Box>
      </Flex>
    );
  };
  
  export default VerificacaoCNPJ;
  
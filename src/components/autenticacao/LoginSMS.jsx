import {
  Box, Button, Flex, FormControl, FormLabel, Heading, Input, VStack, Image,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../images/logo.png"; // ajuste o caminho conforme o seu projeto

const AutenticacaoSms = ({ onVerificado }) => {
  const [telefone, setTelefone] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigoGerado, setCodigoGerado] = useState("");
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const toast = useToast();

  const gerarCodigo = () => {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGerado(codigo);
    console.log("Código gerado (simulação):", codigo);
    toast({
      title: "Código enviado!",
      description: `Simulação: seu código é ${codigo}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    setCodigoEnviado(true);
  };

  const verificarCodigo = () => {
    if (codigoDigitado === codigoGerado) {
      toast({
        title: "Verificado com sucesso!",
        description: "Seu número foi autenticado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      if (onVerificado) onVerificado(telefone);
    } else {
      toast({
        title: "Código inválido!",
        description: "Verifique o código enviado e tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
        w={{ base: "90%", md: "500px" }}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={8}
        direction="column"
      >
        <Box textAlign="center" mb={8}>
          <Image src={logo} alt="Grupo Saber" boxSize="100px" mx="auto" mb={4} />
          <Heading size="lg" color="gray.700">Autenticação por SMS</Heading>
          <Box fontSize="md" color="gray.500" mt={2}>
            Enviaremos um código para o seu número de celular
          </Box>
        </Box>

        <VStack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Número de telefone</FormLabel>
            <Input
              placeholder="Ex: +55DDD900000000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              maxLength={15}
            />
          </FormControl>

          <Button colorScheme="blue" w="100%" onClick={gerarCodigo}>
            Enviar Código
          </Button>

          {codigoEnviado && (
            <>
              <FormControl isRequired>
                <FormLabel>Digite o código recebido</FormLabel>
                <Input
                  placeholder="Código de 6 dígitos"
                  value={codigoDigitado}
                  onChange={(e) => setCodigoDigitado(e.target.value)}
                  maxLength={6}
                />
              </FormControl>

              <Button colorScheme="green" w="100%" onClick={verificarCodigo}>
                Verificar
              </Button>
            </>
          )}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AutenticacaoSms;

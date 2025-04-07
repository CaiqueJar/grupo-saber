import {
  Box, Button, Flex, FormControl, FormLabel, Heading, Input,
  VStack, Image, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import logo from "../../images/logo.png";

const LoginEmail = () => {
  const [email, setEmail] = useState("");
  const [codigoGerado, setCodigoGerado] = useState("");
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const gerarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleEnviarEmail = () => {
    const codigo = gerarCodigo();
    setCodigoGerado(codigo);
    setCodigoEnviado(true);

    const templateParams = {
      user_email: email,
      verification_code: codigo,
    };

    emailjs.send(
      "service_6o5few9",
      "template_gxj00cj",
      {
        user_email: email,
        verification_code: codigo,
      },
      "3szR39QTeMa_wIJ9l"
    )
      .then(() => {
        toast({
          title: "Código enviado!",
          description: "Verifique seu e-mail para continuar.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao enviar e-mail",
          description: error.text,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  const handleVerificarCodigo = () => {
    if (codigoDigitado === codigoGerado) {
      toast({
        title: "Código verificado!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/etapa2"); // redireciona para a segunda etapa do cadastro
    } else {
      toast({
        title: "Código incorreto",
        description: "Tente novamente.",
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
      position="relative"
      p={4}
    >
      {/* Logo */}
      <Image
        src={logo}
        alt="Logo Grupo Saber"
        boxSize="150px"
        position="absolute"
        top="30px"
        left="30px"
      />

      <Flex
        w={{ base: "90%", md: "500px" }}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={8}
        direction="column"
        textAlign="center"
      >
        <Heading size="lg" color="gray.700" mb={6}>
          Entrar com E-mail
        </Heading>

        <VStack spacing={5}>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="blue" size="lg" w="100%" onClick={handleEnviarEmail}>
            Enviar código
          </Button>

          {codigoEnviado && (
            <>
              <FormControl>
                <FormLabel>Código de Verificação</FormLabel>
                <Input
                  placeholder="Digite o código recebido"
                  value={codigoDigitado}
                  onChange={(e) => setCodigoDigitado(e.target.value)}
                />
              </FormControl>
              <Button colorScheme="green" size="lg" w="100%" onClick={handleVerificarCodigo}>
                Verificar
              </Button>
            </>
          )}
        </VStack>
      </Flex>
    </Flex>
  );
};

export default LoginEmail;

import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Image,
  Spacer,
  Link,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CadastroRestauranteDados = ({ dadosRestaurante, atualizarDados }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    atualizarDados({
      ...dadosRestaurante,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nomeCompleto, telefone, email } = dadosRestaurante;

    if (!nomeCompleto || !telefone || !email) {
      toast({
        title: "Preencha todos os campos obrigatórios.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log("Dados do restaurante:", dadosRestaurante);

    navigate("/verificacao-email-restaurante");
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-b, #D7E3ED, #A9C0D3, #7C9FB6, #4F7F9A)">
      {/* Navbar */}
      <Flex
        as="header"
        w="100%"
        px={10}
        py={4}
        bg="white"
        align="center"
        boxShadow="sm"
        position="fixed"
        top={0}
        zIndex={10}
      >
        <Link
          fontWeight="bold"
          fontSize="xl"
          color="blue.600"
          href="/cadastro-restaurante"
        >
          Grupo Saber
        </Link>
        <Spacer />
        <Flex gap={10} align="center">
          <Link fontWeight="medium" fontSize="lg" color="gray.700" href="#">
            Como funciona
          </Link>
          <Link fontWeight="medium" fontSize="lg" color="gray.700" href="#">
            Ajuda
          </Link>
          <Button colorScheme="blue">Cadastrar</Button>
        </Flex>
      </Flex>

      {/* Conteúdo */}
      <Flex
        pt="100px"
        minH="100vh"
        w="100%"
        align="center"
        justify="center"
        px={{ base: 6, md: 40 }}
      >
        <Box
          bg="white"
          p={16}
          borderRadius="2xl"
          boxShadow="2xl"
          maxW="800px"
          w="100%"
        >
          <form onSubmit={handleSubmit}>
            <Text fontSize="4xl" fontWeight="bold" mb={1}>
              Cadastre o seu restaurante!
            </Text>
            <Text fontSize="lg" color="gray.600" mb={8}>
              Agora precisamos de mais algumas informações:
            </Text>

            <FormControl mb={6} isRequired>
              <FormLabel>Nome completo</FormLabel>
              <Input
                type="text"
                name="nomeCompleto"
                placeholder="Digite seu nome"
                value={dadosRestaurante.nomeCompleto || ''}
                onChange={handleChange}
                size="lg"
              />
            </FormControl>

            <FormControl mb={6} isRequired>
              <FormLabel>Número de telefone</FormLabel>
              <Input
                type="tel"
                name="telefone"
                placeholder="(xx) xxxxx-xxxx"
                value={dadosRestaurante.telefone || ''}
                onChange={handleChange}
                size="lg"
              />
            </FormControl>

            <FormControl mb={6} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={dadosRestaurante.email || ''}
                readOnly
                size="lg"
                bg="gray.100"
              />
            </FormControl>

            <Button
              type="submit"
              bg="blue.700"
              color="white"
              _hover={{ bg: "blue.800" }}
              w="100%"
              size="lg"
              mt={10}
            >
              Continuar
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default CadastroRestauranteDados;

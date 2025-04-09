import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Image,
  Spacer,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import restaurante from "../../images/Restaurante.png";

const CadastroRestaurante = ({ dadosRestaurante, atualizarDados }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    atualizarDados({ email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/cadastro-restaurante-dados');
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
        href="/cadastro-restaurante"
        fontWeight="bold"
        fontSize="2xl"
        color="blue.600"
        _hover={{ textDecoration: "none", color: "blue.800" }}
      >
        Grupo Saber
      </Link>
      <Spacer />
      <Flex gap={100} align="center">
        <Link fontWeight="semibold" fontSize="lg" color="gray.700" href="#" _hover={{ color: "blue.600" }}>
          Como funciona
        </Link>
        <Link fontWeight="semibold" fontSize="lg" color="gray.700" href="#" _hover={{ color: "blue.600" }}>
          Ajuda
        </Link>
        <Button colorScheme="blue" fontSize="lg" px={6}>
          Cadastrar
        </Button>
      </Flex>
    </Flex>

      {/* Conteúdo geral */}
      <Flex
        pt="100px"
        minH="100vh"
        w="100%"
        align="center"
        justify="space-between"
        px={{ base: 12, md: 40 }}
      >
        {/* Lado esquerdo */}
        <Box maxW="450px">
        <Text
            fontWeight="bold"
            fontSize={{ base: "3xl", md: "4xl" }}
            color="gray.800"
            mb={2}
            lineHeight="1.2"
          >
            Coloque seu <br /> restaurante na <br /> rede grupo saber
          </Text>

          <Image
            src={restaurante}
            alt="Ícone restaurante"
            boxSize={{ base: "350px", md: "350px" }}
            mt={2}
          />
        </Box>

        {/* Lado direito - formulário */}
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
          Para começarmos, digite no campo abaixo
        </Text>

        <Text fontSize="md" fontWeight="semibold" mb={1}>
          Insira seu e-mail<span style={{ color: 'red' }}>*</span>
        </Text>

        <Input
          type="email"
          placeholder="email@example.com"
          value={dadosRestaurante.email}
          onChange={handleChange}
          mb={6}
          size="lg"
          required
        />

        <Button
          type="submit"
          bg="blue.700"
          color="white"
          _hover={{ bg: "blue.800" }}
          w="100%"
          size="lg"
          mt={10}
        >
          Cadastrar Agora
        </Button>
      </form>
    </Box>
      </Flex>
    </Box>
  );
};

export default CadastroRestaurante;

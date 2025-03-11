import { 
    Box, Button, Flex, Heading, Text, VStack, Icon, Image 
  } from "@chakra-ui/react";
  import { CheckCircleIcon } from "@chakra-ui/icons";
  import { useNavigate } from 'react-router-dom';
  import logo from "../../images/logo.png";
  
  const ConfirmacaoCadastro = ({ dadosUsuario }) => {
    const navigate = useNavigate();
  
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
          textAlign="center"
        >
          <Image 
            src={logo} 
            alt="Grupo Saber" 
            boxSize="100px" 
            mx="auto"
            mb={4}
          />
          
          <Icon as={CheckCircleIcon} w={20} h={20} color="green.500" mx="auto" my={4} />
          
          <Heading size="lg" color="gray.700" mb={4}>
            Cadastro Concluído!
          </Heading>
          
          <Text fontSize="md" mb={6}>
            Seja bem-vindo ao Grupo Saber, {dadosUsuario.nomeCompleto.split(' ')[0]}! Seu cadastro foi realizado com sucesso.
          </Text>
          
          <VStack spacing={4}>
            <Button 
              colorScheme="blue" 
              w="100%" 
              size="lg"
              onClick={() => navigate('/')} // Pode apontar para a página inicial ou dashboard
            >
              Ir para Home
            </Button>
          </VStack>
        </Flex>
      </Flex>
    );
  };
  
  export default ConfirmacaoCadastro;
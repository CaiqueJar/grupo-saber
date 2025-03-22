import { 
    Box, Button, Flex, FormControl, FormLabel, Heading, Input, VStack, Image, 
    IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalBody, ModalCloseButton, useToast 
  } from "@chakra-ui/react";
  import { InfoIcon } from "@chakra-ui/icons";
  import { useNavigate } from 'react-router-dom';
  import motoboy from "../../images/Motoboy.png";
  import logo from "../../images/logo.png";
  
  const PrimeiraEtapa = ({ dadosUsuario, atualizarDados }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();
  
    const validateName = (name) => {
      return name.trim().split(" ").length > 1; // Verifica se há pelo menos um sobrenome
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar formato de email
      return emailRegex.test(email);
    };
  
    const handleSubmit = () => {
      if (!validateName(dadosUsuario.nomeCompleto)) {
        toast({
          title: "Nome inválido!",
          description: "Por favor, insira seu nome completo com sobrenome.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      if (!validateEmail(dadosUsuario.email)) {
        toast({
          title: "E-mail inválido!",
          description: "Por favor, insira um e-mail válido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
  
      // Se validações passaram, navegar para próxima etapa
      navigate('/etapa2');
    };
  
    return (
      <Flex
        h="100vh"
        align="center"
        justify="flex-start"
        bg="linear-gradient(to right, #f0f8ff, #cce7ff)"
        p={4}
        position="relative"
      >
        <IconButton
          aria-label="Informações"
          icon={<InfoIcon boxSize={8}/>}
          color="blue.500" 
          bg="transparent"
          _hover={{ bg: "gray.100" }}
          position="absolute"
          top="30px"
          right="30px"
          onClick={onOpen}
        />
        
        <Image 
          src={logo} 
          alt="Grupo Saber" 
          boxSize="200px" 
          position="absolute"
          top="25px"
          left="25px"
        />
        
        <Image
          src={motoboy}
          alt="Delivery"
          boxSize="500px"
          position="absolute"
          top="20%"
          left="10%"
        />
       
        <Flex
          w={{ base: "90%", md: "600px" }}
          h={{ base: "auto", md: "600px" }}
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          p={8}
          direction="column"
          ml="auto"
          mr={{ base: "auto", md: "5%" }}
        >
          <Box textAlign="center" mb={8}>
            <Heading size="xl" color="gray.700">
              Bem-vindo ao Grupo Saber!
            </Heading>
            <Box fontSize="lg" color="gray.500" mt={4}>
              Preencha alguns campos para continuar
            </Box>
          </Box>
          
          <VStack spacing={6} w="100%">
            <FormControl isRequired>
              <FormLabel fontSize="lg">Nome Completo</FormLabel>
              <Input
                value={dadosUsuario.nomeCompleto}
                onChange={(e) => atualizarDados({ nomeCompleto: e.target.value })}
                placeholder="Insira seu Nome Completo"
                size="lg"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="lg">E-mail</FormLabel>
              <Input
                value={dadosUsuario.email}
                onChange={(e) => atualizarDados({ email: e.target.value })}
                placeholder="Insira seu E-mail"
                type="email"
                size="lg"
              />
            </FormControl>
            <Button colorScheme="blue" w="100%" size="lg" onClick={handleSubmit}>
              Continuar
            </Button>
          </VStack>
        </Flex>
  
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sobre o Grupo Saber</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              O Grupo Saber é um sistema que conecta clientes a prestadores de serviço de entrega de forma rápida e eficiente. Nossa plataforma facilita o cadastro e a comunicação entre usuários, tornando o processo de solicitação e gestão de entregas mais simples e organizado.
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    );
  };
  
  export default PrimeiraEtapa;
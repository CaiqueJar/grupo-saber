import { Box, Button, Flex, Heading, Image, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import motoboy from "../../images/Motoboy.png";

const PrimeiraEtapa = () => {
  const navigate = useNavigate();

  return (
    <Flex
      h="100vh"
      align="center"
      justify="flex-start"
      bg="linear-gradient(to right, #f0f8ff, #cce7ff)"
      p={4}
      position="relative"
    >
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
        w={{ base: "90%", md: "500px" }}
        h={{ base: "auto", md: "400px" }}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        p={8}
        direction="column"
        ml="auto"
        mr={{ base: "auto", md: "5%" }}
      >
        <Box textAlign="center" mb={8}>
          <Heading size="lg" color="gray.700">
            Como você quer se autenticar?
          </Heading>
        </Box>

        <VStack spacing={6} w="100%">
          <Button
            colorScheme="blue"
            w="100%"
            size="lg"
            onClick={() => navigate("/login-email")}
          >
            Autenticar por E-mail
          </Button>
          <Button
            colorScheme="teal"
            w="100%"
            size="lg"
            onClick={() => navigate("/login-sms")}
          >
            Autenticar por SMS
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default PrimeiraEtapa;

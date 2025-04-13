import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Progress,
  Image,
} from "@chakra-ui/react"; // Adicionando a importação do Image
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import LogoSaber from "../../images/Logo.png";

const CadastroSenha = () => {
  const [mostrarCampos, setMostrarCampos] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Aqui você pode salvar a senha
    console.log("Senha cadastrada:", senha);
    navigate("/horario-funcionamento");
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-b, #d0e1f9, #4a708b)" px={4}>
      <Box bg="white" p={10} rounded="2xl" shadow="xl" w="100%" maxW="500px">
        <Image src={LogoSaber} w="150px" mx="auto" mb={6} />
        
        <Progress value={100} size="xs" colorScheme="cyan" borderRadius="full" mb={6} />

        <Flex align="center" mb={4}>
          <Box bg="gray.100" p={3} borderRadius="full" mr={3}>
            <FaLock size={20} color="#3c9dbb" />
          </Box>
          <Text fontSize="xl" fontWeight="bold">Cadastre uma senha mais forte</Text>
        </Flex>

        <Text color="gray.600" mb={6}>
          Uma senha forte garante mais segurança pra sua conta no Portal. Que tal atualizar agora?
        </Text>

        {mostrarCampos ? (
          <form onSubmit={handleSubmit}>
            <FormControl id="senha" mb={4} isRequired>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </FormControl>

            <FormControl id="confirmarSenha" mb={6} isRequired>
              <FormLabel>Confirmar senha</FormLabel>
              <Input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme sua senha"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              _hover={{ transform: "scale(1.02)", boxShadow: "md" }}
              transition="all 0.2s"
            >
              Finalizar cadastro
            </Button>
          </form>
        ) : (
          <Button
            colorScheme="green"
            width="full"
            onClick={() => setMostrarCampos(true)}
            _hover={{ transform: "scale(1.02)", boxShadow: "md" }}
            transition="all 0.2s"
          >
            Cadastrar senha
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default CadastroSenha;

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
  VStack,
  useToast,
  Progress
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FinalizacaoCadastro = () => {
  const [aceitouContrato, setAceitouContrato] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleAssinar = () => {
    if (!aceitouContrato) {
      toast({
        title: "Você precisa aceitar o contrato",
        description: "Leia e aceite os termos para continuar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Aqui futuramente você pode enviar a confirmação para o backend
    navigate("/cadastrar-senha");
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-b, #d0e1f9, #4a708b)" px={4}>
      <Box bg="white" p={10} rounded="md" shadow="lg" w="100%" maxW="700px">
        {/* Barra de progresso fake */}
        <Progress value={90} size="xs" colorScheme="green" borderRadius="full" mb={6} />

        <Text fontSize="3xl" fontWeight="bold" mb={4}> {/* Aumentando o tamanho do título */}
          Assinatura do Contrato
        </Text>

        <Text fontSize="md" color="gray.600" mb={6}> {/* Aumentando a descrição */}
          Leia atentamente os termos abaixo. Para concluir o cadastro, é necessário aceitar as condições do Grupo Saber.
        </Text>

        <Box
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          h="200px"
          overflowY="auto"
          mb={6}
          fontSize='18'
          color="gray.700"
        >
          <Text mb={8}><strong>1. Termos Gerais:</strong> O Grupo Saber se compromete a disponibilizar a plataforma para divulgação e gestão dos pedidos da loja parceira.</Text>
          <Text mb={8}><strong>2. Responsabilidade:</strong> O parceiro é responsável pela veracidade das informações, qualidade dos produtos e atendimento ao cliente.</Text>
          <Text mb={8}><strong>3. Cancelamento:</strong> O contrato poderá ser encerrado por qualquer uma das partes, mediante aviso prévio.</Text>
          <Text><strong>4. Outras condições:</strong> Sujeito a atualizações, notificadas previamente via e-mail ou painel do parceiro.</Text>
        </Box>

        <VStack align="start" mb={4}>
          <Checkbox
            isChecked={aceitouContrato}
            onChange={(e) => setAceitouContrato(e.target.checked)}
          >
            Eu li e aceito os termos do contrato com o Grupo Saber.
          </Checkbox>
        </VStack>

        <Button colorScheme="blue" w="full" onClick={handleAssinar}>
          Finalizar Cadastro
        </Button>
      </Box>
    </Flex>
  );
};

export default FinalizacaoCadastro;

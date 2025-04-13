import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Spacer,
  Link,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const VerificacaoEmailRestaurante = ({ dadosRestaurante }) => {
  const [codigo, setCodigo] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const serviceID = "service_6o5few9";
  const templateID = "template_gxj00cj";
  const publicKey = "3szR39QTeMa_wIJ9l";

  const gerarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

  const enviarCodigoEmail = () => {
    const novoCodigo = gerarCodigo();

    // Salva no localStorage para checagem posterior
    localStorage.setItem('codigoVerificacaoRestaurante', novoCodigo);

    const templateParams = {
      user_email: dadosRestaurante?.email,  // Aqui o email será enviado para o e-mail do restaurante
      verification_code: novoCodigo,       // Mesmo nome da variável no template do EmailJS
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        toast({
          title: 'Código enviado para o e-mail!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Erro ao enviar o código.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    // Só envia o código se ele ainda não foi gerado e armazenado
    if (dadosRestaurante?.email && !localStorage.getItem('codigoVerificacaoRestaurante')) {
      enviarCodigoEmail();
    }
  }, [dadosRestaurante]);

  const handleVerificar = () => {
    const codigoArmazenado = localStorage.getItem('codigoVerificacaoRestaurante');
    if (codigo === codigoArmazenado) {
      toast({
        title: 'Código verificado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/cadastro-endereco-restaurante');
    } else {
      toast({
        title: 'Código inválido.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-b, #D7E3ED, #A9C0D3, #7C9FB6, #4F7F9A)">
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
        </Flex>
      </Flex>

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
          <Text fontSize="4xl" fontWeight="bold" mb={1}>
            Verifique seu e-mail!
          </Text>
          <Text fontSize="lg" color="gray.600" mb={8}>
            Enviamos um código de 6 dígitos para <strong>{dadosRestaurante?.email}</strong>.
            Digite-o abaixo para confirmar.
          </Text>

          <FormControl mb={6} isRequired>
            <FormLabel>Código de verificação</FormLabel>
            <Input
              type="text"
              maxLength={6}
              placeholder="Digite o código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              size="lg"
            />
          </FormControl>

          <Button
            variant="link"
            color="blue.600"
            mb={4}
            onClick={enviarCodigoEmail}
          >
            Reenviar código
          </Button>

          <Button
            colorScheme="blue"
            size="lg"
            w="100%"
            onClick={handleVerificar}
          >
            Validar e continuar
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default VerificacaoEmailRestaurante;

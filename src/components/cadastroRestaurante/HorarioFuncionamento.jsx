import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  Grid,
  GridItem,
  useToast,
  Image,
  VStack,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { FaRegClock } from 'react-icons/fa';
import LogoSaber from "../../images/Logo.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HorarioFuncionamento = () => {
  const [horarios, setHorarios] = useState({
    segunda: { abertura: '', fechamento: '' },
    terca: { abertura: '', fechamento: '' },
    quarta: { abertura: '', fechamento: '' },
    quinta: { abertura: '', fechamento: '' },
    sexta: { abertura: '', fechamento: '' },
    sabado: { abertura: '', fechamento: '' },
    domingo: { abertura: '', fechamento: '' },
  });

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const opcoesHorario = [
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '13:00', label: '13:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' },
    { value: 'fechado', label: 'Fechado' },
  ];

  const handleChange = (dia, tipo, valor) => {
    setHorarios({
      ...horarios,
      [dia]: {
        ...horarios[dia],
        [tipo]: valor,
      },
    });
  };

  const handleSubmit = () => {
    for (const dia in horarios) {
      if (horarios[dia].abertura === '' || horarios[dia].fechamento === '') {
        toast({
          title: `Horário não definido para ${dia.charAt(0).toUpperCase() + dia.slice(1)}`,
          description: 'Por favor, defina o horário de abertura e fechamento para todos os dias.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Horário de funcionamento salvo com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/menu-inicial');
    }, 2000);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #D7E3ED, #A9C0D3, #7C9FB6, #4F7F9A)"
      p={6}
      pt={10}
    >
      <Box textAlign="center" mb={8}>
        <Image src={LogoSaber} alt="Logo Grupo Saber" boxSize="150px" mx="auto" />
      </Box>

      <VStack
        spacing={6}
        align="stretch"
        maxW="100%"
        mx="auto"
        p={6}
        borderRadius="2xl"
        boxShadow="xl"
        bg="rgba(255, 255, 255, 0.15)"
        backdropFilter="blur(10px)"
        border="2px solid rgba(255, 255, 255, 0.3)"
      >
        <Text
          fontSize="3xl"
          fontWeight="bold"
          mb={4}
          textAlign="center"
          fontFamily="'Arial', sans-serif"
          color="black"
        >
          Horário de Funcionamento
        </Text>

        <Grid templateColumns="repeat(7, 1fr)" gap={6}>
          {Object.keys(horarios).map((dia) => (
            <GridItem key={dia} colSpan={1}>
              <FormControl>
                <Text
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="lg"
                  mb={2}
                  color="black"
                >
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </Text>

                <Box
                  bg="gray.50"
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  mb={3}
                  transition="all 0.3s"
                  _hover={{ boxShadow: 'md', transform: 'scale(1.02)' }}
                >
                  <FormLabel htmlFor={`${dia}-abertura`} fontSize="sm" fontWeight="semibold">Abertura</FormLabel>
                  <Select
                    id={`${dia}-abertura`}
                    value={horarios[dia].abertura}
                    onChange={(e) => handleChange(dia, 'abertura', e.target.value)}
                    placeholder="Selecione a abertura"
                    icon={<Icon as={FaRegClock} boxSize={4} />}
                    _focus={{ borderColor: 'teal.500' }}
                    size="md"
                  >
                    {opcoesHorario.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </Select>
                </Box>

                <Box
                  bg="gray.50"
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  transition="all 0.3s"
                  _hover={{ boxShadow: 'md', transform: 'scale(1.02)' }}
                >
                  <FormLabel htmlFor={`${dia}-fechamento`} fontSize="sm" fontWeight="semibold">Fechamento</FormLabel>
                  <Select
                    id={`${dia}-fechamento`}
                    value={horarios[dia].fechamento}
                    onChange={(e) => handleChange(dia, 'fechamento', e.target.value)}
                    placeholder="Selecione o fechamento"
                    icon={<Icon as={FaRegClock} boxSize={4} />}
                    _focus={{ borderColor: 'teal.500' }}
                    size="md"
                  >
                    {opcoesHorario.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </Select>
                </Box>
              </FormControl>
            </GridItem>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            as={motion.button}
            colorScheme="teal"
            onClick={handleSubmit}
            width="full"
            mt={6}
            height="48px"
            borderRadius="md"
            _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition="all 0.2s"
          >
            {isLoading ? <Spinner size="md" color="white" /> : 'Salvar Horários'}
          </Button>
        </motion.div>
      </VStack>
    </Box>
  );
};

export default HorarioFuncionamento;

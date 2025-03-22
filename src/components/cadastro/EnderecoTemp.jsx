import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box, Button, Heading, Flex, FormControl, FormLabel, Input,
  FormErrorMessage, VStack, Select
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const estados = [
  { sigla: "AC", nome: "Acre" }, { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" }, { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" }, { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" }, { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" }, { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" }, { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" }, { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" }, { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" }, { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" }, { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" }, { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" }, { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" }, { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" }
];

function EnderecoForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, setValue, handleSubmit, formState: { errors } } = useForm();

  const buscarCep = async (cep) => {
    if (cep.length !== 8) return;
    setIsLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue("rua", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    console.log("Endereço enviado:", data);
    alert("Endereço cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center" bg="blue.50" p={4}>
      <Box bg="white" p={8} borderRadius="md" boxShadow="lg" width={{ base: "90%", md: "600px" }}>
        <Heading mb={6} textAlign="center">Cadastro de Endereço</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>

            <Flex w="100%" gap={4}>
              <FormControl isRequired isInvalid={errors.cep}>
                <FormLabel>CEP</FormLabel>
                <Input
                  {...register("cep", { required: "CEP obrigatório", minLength: 8, maxLength: 8 })}
                  placeholder="Digite o CEP"
                  maxLength={8}
                  onBlur={(e) => buscarCep(e.target.value)}
                />
                <FormErrorMessage>{errors.cep?.message}</FormErrorMessage>
              </FormControl>

              <Button mt={8} colorScheme="blue" isLoading={isLoading} loadingText="Buscando...">
                Buscar CEP
              </Button>
            </Flex>

            <FormControl isRequired isInvalid={errors.rua}>
              <FormLabel>Rua</FormLabel>
              <Input {...register("rua", { required: "Rua obrigatória" })} placeholder="Digite a rua" />
              <FormErrorMessage>{errors.rua?.message}</FormErrorMessage>
            </FormControl>

            <Flex w="100%" gap={4}>
              <FormControl isRequired>
                <FormLabel>Número</FormLabel>
                <Input {...register("numero", { required: "Número obrigatório" })} placeholder="Nº" />
              </FormControl>

              <FormControl>
                <FormLabel>Complemento</FormLabel>
                <Input {...register("complemento")} placeholder="Apto, Bloco, etc." />
              </FormControl>
            </Flex>

            <FormControl isRequired isInvalid={errors.bairro}>
              <FormLabel>Bairro</FormLabel>
              <Input {...register("bairro", { required: "Bairro obrigatório" })} placeholder="Digite o bairro" />
              <FormErrorMessage>{errors.bairro?.message}</FormErrorMessage>
            </FormControl>

            <Flex w="100%" gap={4}>
              <FormControl isRequired isInvalid={errors.cidade}>
                <FormLabel>Cidade</FormLabel>
                <Input {...register("cidade", { required: "Cidade obrigatória" })} placeholder="Digite a cidade" />
                <FormErrorMessage>{errors.cidade?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.estado}>
                <FormLabel>Estado</FormLabel>
                <Select {...register("estado", { required: "Estado obrigatório" })} placeholder="Selecione">
                  {estados.map((estado) => (
                    <option key={estado.sigla} value={estado.sigla}>
                      {estado.sigla} - {estado.nome}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.estado?.message}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel>Ponto de Referência</FormLabel>
              <Input {...register("pontoReferencia")} placeholder="Ex: Próximo à farmácia" />
            </FormControl>

            <Button colorScheme="blue" w="100%" mt={6} type="submit">
              Finalizar Cadastro
            </Button>

            <Button variant="outline" w="100%" onClick={() => navigate("/")}>
              Voltar
            </Button>

          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default EnderecoForm;

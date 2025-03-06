import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react"
import { useState } from "react";




const ModalComp = ({ data, setData, dataEdit, isOpen, onClose}) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    
    const handleSave = () => {
        if (!name || !email) return;
    
        if (emailJaExiste()) {
            return alert("E-mail já foi cadastrado");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email };
        }

        const newDataArray = !Object.keys(dataEdit).length
        ? [...Box(data ? data : []), { name, email }]
        : [...Box(data ? data:[])];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray))

        setData(newDataArray);

        onClose();
    };

   



    const emailJaExiste = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email ===email);    
        }
        return false;
    };
    return  (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bem-vindo ao Grupo Saber!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome Completo</FormLabel>
                                <Input
                                    type = "text"
                                    value = {name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type = "email"
                                    value = {email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter justifycontent="start">
                        <Button colorScheme="cyan" mr={3} onClick={handleSave}>
                            Cadastrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
 };

 export default ModalComp;
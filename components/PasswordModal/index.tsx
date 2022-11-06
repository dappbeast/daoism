import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DAO } from "../../constants/types";

import logIn from "../../utils/logIn";

interface ModalProps {
  dao: DAO;
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

const PasswordModal = ({ dao, isOpen, onClose, address }: ModalProps) => {
  const [password, setPassword] = useState("");

  const { push } = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("x");

  const handleLogin = () => {
    logIn(address, confirmPassword);
    push(dao.name + "/create");
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={password === confirmPassword ? false : true}
              onClick={handleLogin}
            >
              Confirm Password
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordModal;

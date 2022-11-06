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
import { useEffect, useState } from "react";

import logIn from "../../utils/logIn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string | null;
}

const PasswordModal = ({ isOpen, onClose, address }: ModalProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("x");

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
              onClick={() => logIn(address, confirmPassword)}
            >
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PasswordModal;

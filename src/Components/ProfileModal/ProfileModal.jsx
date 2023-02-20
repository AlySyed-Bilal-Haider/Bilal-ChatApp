import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
function PrfileModal({ open }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text ml={3} onClick={onOpen} style={{ cursor: "pointer" }}>
        Profile
      </Text>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bilal</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Email</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrfileModal;

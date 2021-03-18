import React from 'react'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  Button,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'

export default observer(function ModalStore() {
  const { modalStore } = useStore()

  return (
    <Modal isOpen={modalStore.modal.open} onClose={modalStore.closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={() => modalStore.closeModal()} />
        <ModalBody>{modalStore.modal.body}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
})

import React from "react"
import {useStore} from "../../stores/store";
import {observer} from "mobx-react-lite";
import {
    Modal,
    ModalContent, ModalOverlay,ModalFooter, Button
} from "@chakra-ui/react"


export default observer (function ModalStore () {
    const {modalStore} = useStore()
    
    return (
        <Modal isOpen={modalStore.modal.open} onClose={modalStore.closeModal}>
            <ModalOverlay/>
            <ModalContent>
                {modalStore.modal.body}
                <ModalFooter>
                    <Button colorScheme="blue" onClick={() => modalStore.closeModal()}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
           
        </Modal>

    )
})
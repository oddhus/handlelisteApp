import React from "react"
import { Box } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {
    isOpen: boolean
    toggle: () => void
}

export const MenuToggle: React.FC<Props> = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", sm: "none" }} onClick={() => toggle()}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Box>
    )
}
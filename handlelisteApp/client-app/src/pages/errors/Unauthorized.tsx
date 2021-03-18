import React from 'react'
import {observer} from "mobx-react-lite";
import {Heading, Container, Center} from "@chakra-ui/react";

interface Props {
}

export const Unauthorized: React.FC<Props> = observer(() => {
    return (
        <Container>
            <Center>
                <Heading as='h1'>Unauthorized</Heading>
            </Center>
        </Container>
    )
})

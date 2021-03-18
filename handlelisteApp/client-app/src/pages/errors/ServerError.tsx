import React from 'react'
import {observer} from "mobx-react-lite";
import {Heading, Container, Code, Box, Center} from "@chakra-ui/react";

import {useStore} from "../../stores/store";


interface Props {
}

export const ServerError: React.FC<Props> = observer(() => {
    const {commonStore} = useStore()
    return (
        <Container>
            <Center>
                <Heading as='h1'> Server error</Heading>
                <Heading as='h5' color="red" size='sm'> {commonStore.error?.message}</Heading>
            </Center>
        </Container>
    )
})

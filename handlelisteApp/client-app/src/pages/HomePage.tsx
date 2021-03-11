import React from "react";
import {Center, Text, Heading, Button, Box, ButtonGroup} from "@chakra-ui/react"
import {useStore} from "../stores/store";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
import {observer} from "mobx-react-lite";

interface Props {}

export const HomePage: React.FC<Props> = observer(() => {
    const {modalStore, settingStore} = useStore()
    
    return (
            <Center h="600px" data-testid='homepage'>
                <Box maxW="32rem">
                    <Heading data-testid='Heading' mb={4}>{settingStore.language.shoppingLists}</Heading>
                    <Text fontSize="xl">
                        {settingStore.language.welcomeToTheShoppingList}
                    </Text>
                        <ButtonGroup>
                            <Button
                                size="lg"
                                colorScheme="green"
                                mt="24px"
                                onClick={() => modalStore.openModal(<SignIn/>)}
                            >
                                {settingStore.language.login}
                            </Button>
                            <Button
                                size="lg"
                                colorScheme="blue"
                                mt="24px"
                                onClick={() => modalStore.openModal(<SignUp/>)}
                            >
                                {settingStore.language.signUp}
                            </Button>
                        </ButtonGroup>
                </Box>
            </Center>
    )
});

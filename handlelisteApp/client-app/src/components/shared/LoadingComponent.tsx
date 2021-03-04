import {Container} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import { Center, Text,Spinner, Stack} from "@chakra-ui/react"

interface Props {}


export const LoadingComponent: React.FC<Props> = observer(() => {
    
        return (
            <Center  h="600px"  color="black">
                <Stack>
                    <Spinner
                        thickness="4px"
                        speed="1.0s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                    <Text fontSize="30px">Loading app...</Text>
                </Stack>
            </Center>
        )
    }
)

import { Container } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { Center, Text, Spinner, Stack} from '@chakra-ui/react'

interface Props {
    loadingText: string
}

export const LoadingComponent: React.FC<Props> = observer(({loadingText}) => {
  return (
    <Center h="600px" color="black">
      <Stack>
          <Center>
              <Spinner
                  thickness="4px"
                  speed="1.0s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
              /> 
          </Center>
        <Text fontSize="30px">{`${loadingText}...`}</Text>
      </Stack>
    </Center>
  )
})

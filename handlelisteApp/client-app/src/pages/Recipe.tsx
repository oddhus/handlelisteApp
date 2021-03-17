import { CircularProgress } from '@chakra-ui/progress'
import {
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  Center,
  Container,
  Heading,
  Text,
  VStack,
  Thead,
  Box,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../stores/store'

interface Props {}

export const Recipe: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore } = useStore()
  const { recipeId } = useParams<{ recipeId: string | undefined }>()

  useEffect(() => {
    if (recipeId) {
      recipeStore.getRecipe(parseInt(recipeId))
    }
  }, [recipeId])

  console.log('Items', recipeStore.currentRecipe?.items)

  if (recipeStore.loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    )
  }

  if (!recipeStore.loading && !recipeStore.currentRecipe) {
    return (
      <Center>
        <Heading>Recipe not found...</Heading>
      </Center>
    )
  }

  return (
    <Container>
      <VStack alignItems="flex-start">
        {settingStore.language.recipe}
        <Box minW="100%">
          <Center>
            <Heading>{recipeStore.currentRecipe?.recipeName}</Heading>
          </Center>
        </Box>
        <Text fontSize="xl">{recipeStore.currentRecipe!.shortDescription}</Text>
        <Text fontSize="xl">{recipeStore.currentRecipe!.approach}</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Quanitiy</Th>
              <Th>Unit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recipeStore.currentRecipe!.items.map((item) => {
              return (
                <Tr key={`${item.itemName}-${item.quantity}`}>
                  <Td>{item.itemName}</Td>
                  <Td isNumeric>{item.quantity}</Td>
                  <Td>{item.unit}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  )
})

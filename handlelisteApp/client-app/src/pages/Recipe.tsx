import { CircularProgress } from '@chakra-ui/progress'
import {
  Center,
  Container,
  Heading,
  Text,
  VStack,
  Box,
  Divider,
  Button,
  useToast,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ItemList } from '../components/recipes/ItemList'
import { RecipeToShoppingList } from '../components/recipes/RecipeToShoppingList'
import { useStore } from '../stores/store'

interface Props {}

export const Recipe: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore, modalStore } = useStore()
  const { recipeId } = useParams<{ recipeId: string | undefined }>()
  const toast = useToast()

  useEffect(() => {
    recipeStore.reset()
  }, [])

  useEffect(() => {
    if (recipeId) {
      recipeStore.getRecipe(parseInt(recipeId))
    }
  }, [recipeId])

  useEffect(() => {
    if (recipeStore.errorToastMessage || recipeStore.successToastMessage) {
      toast({
        title: !!recipeStore.errorToastMessage ? 'Failed' : 'Success',
        description: !!recipeStore.errorToastMessage
          ? recipeStore.errorToastMessage
          : recipeStore.successToastMessage,
        status: !!recipeStore.errorToastMessage ? 'error' : 'success',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [recipeStore.errorToastMessage, recipeStore.successToastMessage, toast])

  if (recipeStore.loading) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    )
  }

  if (!recipeStore.currentRecipe) {
    return (
      <Center>
        <Divider />
        <Text>{settingStore.language.noRecipeFound}</Text>
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
        <Box minW="100%">
          <ItemList items={recipeStore.currentRecipe!.items} />
        </Box>
        {recipeStore.currentRecipe.items.length === 0 && <Divider />}
        <Box minW="100%" pt={2}>
          <Center>
            <Button
              onClick={() => modalStore.openModal(<RecipeToShoppingList />)}
              disabled={recipeStore.currentRecipe?.items.length === 0}
              colorScheme="teal"
              variant="outline"
            >
              {settingStore.language.addRecipeToShoppingList}
            </Button>
          </Center>
        </Box>
      </VStack>
    </Container>
  )
})

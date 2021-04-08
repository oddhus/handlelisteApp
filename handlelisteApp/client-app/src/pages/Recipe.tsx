import { EditIcon } from '@chakra-ui/icons'
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
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ItemList } from '../components/recipes/ItemList'
import { RecipeActionButtons } from '../components/recipes/RecipeActionButtons'
import { RecipeToShoppingList } from '../components/recipes/RecipeToShoppingList'
import { Toast } from '../components/shared/Toast'
import { useStore } from '../stores/store'

interface Props {}

export const Recipe: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore, modalStore } = useStore()
  const { recipeId } = useParams<{ recipeId: string | undefined }>()

  useEffect(() => {
    if (recipeId) {
      recipeStore.getRecipe(parseInt(recipeId))
    }
  }, [recipeId])

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
      <Toast store={recipeStore} />
      <VStack alignItems="flex-start">
        <Box minW="100%">
          <HStack justify="space-between">
            <Heading>{recipeStore.currentRecipe?.recipeName}</Heading>
            {recipeStore.isOwner && (
              <RecipeActionButtons
                recipe={recipeStore.currentRecipe}
                editable
              />
            )}
          </HStack>
        </Box>
        <Text fontSize="xl" as="i">
          {recipeStore.currentRecipe!.shortDescription}
        </Text>
        <Text fontSize="md">{recipeStore.currentRecipe!.approach}</Text>
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

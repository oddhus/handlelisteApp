import { Button, Center, Spinner, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const MyRecipes: React.FC<Props> = () => {
  const { recipeStore, userStore } = useStore()
  const history = useHistory()

  useEffect(() => {
    if (userStore.user?.id) {
      recipeStore.getUserRecipes(parseInt(userStore.user.id))
    }
  }, [])

  return (
    <VStack>
      {recipeStore.loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <RecipeList
          recipes={recipeStore.currentRecipeList}
          editable={true}
          deleteable={true}
        />
      )}
      {!recipeStore.loading && recipeStore.currentRecipeList.length === 0 && (
        <Button onClick={() => history.push('create-recipe')}>
          Create recipe
        </Button>
      )}
    </VStack>
  )
}

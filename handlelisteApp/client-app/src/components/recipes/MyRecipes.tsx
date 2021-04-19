import { Button, VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useHistory } from 'react-router'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const MyRecipes: React.FC<Props> = observer(() => {
  const { recipeStore, settingStore } = useStore()
  const history = useHistory()

  return (
    <VStack>
      <RecipeList />
      {!recipeStore.loading && recipeStore.currentRecipeList.length === 0 && (
        <Button data-cy="create-recipe-btn" onClick={() => history.push('/create-recipe')}>
          {settingStore.language.createRecipe}
        </Button>
      )}
    </VStack>
  )
})

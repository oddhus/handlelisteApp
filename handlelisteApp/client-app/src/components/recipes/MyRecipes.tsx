import { Button, Center, Spinner, VStack, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const MyRecipes: React.FC<Props> = observer(() => {
  const { recipeStore, settingStore } = useStore()
  const history = useHistory()

  return (
    <VStack>
      <RecipeList editable={true} deleteable={true} />
      {!recipeStore.loading && recipeStore.currentRecipeList.length === 0 && (
        <Button onClick={() => history.push('/create-recipe')}>
          {settingStore.language.createRecipe}
        </Button>
      )}
    </VStack>
  )
})

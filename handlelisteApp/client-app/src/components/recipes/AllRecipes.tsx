import { Center, Spinner, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect } from 'react'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const AllRecipes: React.FC<Props> = observer(() => {
  const { recipeStore } = useStore()

  useEffect(() => {
    recipeStore.getAllRecipes()
  }, [])

  return (
    <Fragment>
      {recipeStore.loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : !recipeStore.allRecipes || recipeStore.allRecipes.length === 0 ? (
        <Center>
          <Text>No recipes found...</Text>
        </Center>
      ) : (
        <RecipeList
          recipes={recipeStore.allRecipes}
          editable={false}
          deleteable={false}
        />
      )}
    </Fragment>
  )
})

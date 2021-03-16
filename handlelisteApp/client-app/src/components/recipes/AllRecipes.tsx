import { Center, Spinner } from '@chakra-ui/react'
import React, { Fragment, useEffect } from 'react'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const AllRecipes: React.FC<Props> = () => {
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
      ) : (
        <RecipeList
          recipes={recipeStore.allRecipes}
          editable={false}
          deleteable={false}
        />
      )}
    </Fragment>
  )
}

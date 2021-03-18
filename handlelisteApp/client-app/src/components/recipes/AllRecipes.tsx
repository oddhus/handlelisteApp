import { Center, Spinner, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect } from 'react'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const AllRecipes: React.FC<Props> = observer(() => {
  const { recipeStore } = useStore()

  useEffect(() => {
    if (recipeStore.tabIndex === 1) {
      recipeStore.getAllRecipes()
    }
  }, [recipeStore.tabIndex])

  return <RecipeList editable={false} deleteable={false} />
})

import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const AllRecipes: React.FC<Props> = observer(() => {
  const { recipeStore } = useStore()
  return <RecipeList recipes={recipeStore.allRecipes?.recipes} />
})

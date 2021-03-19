import { observer } from 'mobx-react-lite'
import React from 'react'
import { RecipeList } from './RecipeList'

interface Props {}

export const AllRecipes: React.FC<Props> = observer(() => {
  return <RecipeList editable={false} deleteable={false} />
})

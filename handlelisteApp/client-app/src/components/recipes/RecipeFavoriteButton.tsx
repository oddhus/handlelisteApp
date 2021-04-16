import { StarIcon } from '@chakra-ui/icons'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { IRecipe } from '../../models/recipe'
import { useStore } from '../../stores/store'

interface Props {
  recipe: IRecipe
}

export const RecipeFavoriteButton: React.FC<Props> = observer(({ recipe }) => {
  const { recipeStore } = useStore()
  return (
    <StarIcon
      _hover={{
        color: 'yellow.400',
        cursor: 'pointer',
      }}
      color={recipe.hasLiked ? 'yellow.500' : '#CDCDCD'}
      onClick={() => recipeStore.likeOrRemoveLikeOnRecipe(recipe)}
    />
  )
})

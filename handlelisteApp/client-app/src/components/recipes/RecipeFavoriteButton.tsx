import { StarIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Spinner } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { IRecipe } from '../../models/recipe'
import { useStore } from '../../stores/store'

interface Props {
  recipe: IRecipe
  side?: 'left' | 'right'
}

export const RecipeFavoriteButton: React.FC<Props> = observer(
  ({ recipe, side }) => {
    const { recipeStore, userStore } = useStore()
    return (
      <Box>
        {userStore.isLoggedIn && (
          <HStack>
            {recipeStore.loadingAddFavourite === recipe.recipeID &&
              side === 'left' && <Spinner size="sm" />}
            <Button variant="link" _focus={{ outline: 'none' }}>
              <StarIcon
                _hover={{
                  color: 'yellow.400',
                  cursor: 'pointer',
                }}
                color={recipe.hasLiked ? 'yellow.500' : '#CDCDCD'}
                onClick={() => recipeStore.likeOrRemoveLikeOnRecipe(recipe)}
              />
            </Button>
            {recipeStore.loadingAddFavourite === recipe.recipeID &&
              side !== 'left' && <Spinner size="sm" />}
          </HStack>
        )}
      </Box>
    )
  }
)

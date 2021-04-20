import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'
import { Spinner, Center, Text, Grid } from '@chakra-ui/react'
import RecipeCard from './RecipeCard'
import { RecipeListItem } from './RecipeListItem'

interface Props {}

export const RecipeList: React.FC<Props> = observer(() => {
  const { recipeStore, settingStore } = useStore()

  if (recipeStore.loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  if (
    !recipeStore.currentRecipeList ||
    recipeStore.currentRecipeList.length === 0
  ) {
    return (
      <Center>
        <Text data-cy="noRecipe">{settingStore.language.noRecipesFound}</Text>
      </Center>
    )
  }

  return (
    <Fragment>
      <Grid
        templateColumns={
          recipeStore.cardView
            ? ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']
            : 'repeat(1, 1fr)'
        }
        gap={3}
        minW="100%"
      >
        {recipeStore.cardView
          ? recipeStore.currentRecipeList.map((recipe) => (
              <RecipeCard
                key={recipe.recipeID}
                recipe={recipe}
                addable
                editable={recipe.isOwner}
                deleteable={recipe.isOwner}
              />
            ))
          : recipeStore.currentRecipeList.map((recipe) => (
              <RecipeListItem
                key={recipe.recipeID}
                recipe={recipe}
                addable
                editable={recipe.isOwner}
                deleteable={recipe.isOwner}
              />
            ))}
      </Grid>
    </Fragment>
  )
})

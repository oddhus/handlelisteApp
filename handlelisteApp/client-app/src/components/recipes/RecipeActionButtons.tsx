import React from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'
import { IconButton, HStack, Tooltip } from '@chakra-ui/react'
import { AddIcon, CalendarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { RecipeToShoppingList } from './RecipeToShoppingList'
import { IRecipe } from '../../models/recipe'

interface Props {
  addable?: boolean
  editable?: boolean
  deleteable?: boolean
  recipe: IRecipe
  iconSize?: 'sm' | 'md' | 'lg'
}

export const RecipeActionButtons: React.FC<Props> = observer(
  ({ addable, deleteable, editable, recipe, iconSize }) => {
    const { recipeStore, modalStore, settingStore } = useStore()
    const history = useHistory()

    return (
      <HStack justify="flex-end">
        {addable && (
          <Tooltip
            label={settingStore.language.addRecipeToShoppingList}
            fontSize="md"
          >
            <IconButton
              colorScheme="green"
              variant="outline"
              aria-label="Add recipe"
              size={iconSize || 'md'}
              onClick={() => {
                recipeStore.setCurrentRecipe(recipe)
                modalStore.openModal(<RecipeToShoppingList />)
              }}
              icon={<CalendarIcon />}
            />
          </Tooltip>
        )}
        {editable && (
          <IconButton
            colorScheme="yellow"
            variant="outline"
            aria-label="Edit recipe"
            size={iconSize || 'md'}
            className="edit"
            onClick={() => history.push(`/create-recipe/${recipe.recipeID}`)}
            icon={<EditIcon />}
          />
        )}

        {deleteable && (
          <IconButton
            colorScheme="red"
            variant="outline"
            aria-label="Delete recipe"
            size={iconSize || 'md'}
            className="edit"
            onClick={() => {
              if (recipe.recipeID) {
                recipeStore.deleteRecipe(recipe.recipeID)
              }
            }}
            icon={<DeleteIcon />}
          />
        )}
      </HStack>
    )
  }
)

import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'
import {
  IconButton,
  HStack,
  Tooltip,
  VStack,
  MenuList,
  MenuButton,
  Menu,
  MenuItem,
  Box,
  background,
} from '@chakra-ui/react'
import {
  AddIcon,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from '@chakra-ui/icons'
import { RecipeToShoppingList } from './RecipeToShoppingList'
import { IRecipe } from '../../models/recipe'

interface Props {
  addable?: boolean
  editable?: boolean
  deleteable?: boolean
  recipe: IRecipe
  vertical?: boolean
  collapse?: boolean
  iconSize?: 'sm' | 'md' | 'lg'
}

export const RecipeActionButtons: React.FC<Props> = observer(
  ({ addable, deleteable, editable, recipe, iconSize, vertical, collapse }) => {
    const { recipeStore, modalStore, settingStore } = useStore()
    const history = useHistory()

    const allButtons = (
      <Fragment>
        {addable && (
          <Tooltip
            label={settingStore.language.addRecipeToShoppingList}
            fontSize="md"
          >
            <IconButton
              colorScheme="brand"
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
        {collapse ? (
          <Fragment>
            {(editable || deleteable) && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  variant="outline"
                  colorScheme="brand"
                  aria-label="Owner menu"
                  size={iconSize || 'md'}
                  icon={<HamburgerIcon />}
                />
                <MenuList>
                  {editable && (
                    <MenuItem
                      onClick={() =>
                        history.push(`/create-recipe/${recipe.recipeID}`)
                      }
                      icon={<EditIcon />}
                    >
                      Edit
                    </MenuItem>
                  )}
                  {deleteable && (
                    <MenuItem
                      icon={<DeleteIcon />}
                      onClick={() => {
                        if (recipe.recipeID) {
                          recipeStore.deleteRecipe(recipe.recipeID)
                        }
                      }}
                    >
                      Delete
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {editable && (
              <IconButton
                colorScheme="yellow"
                variant="outline"
                aria-label="Edit recipe"
                size={iconSize || 'md'}
                className="edit"
                onClick={() =>
                  history.push(`/create-recipe/${recipe.recipeID}`)
                }
                icon={<EditIcon />}
              />
            )}
            {deleteable && (
              <IconButton
                data-cy="delete-recipe-btn"
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
          </Fragment>
        )}
      </Fragment>
    )

    return (
      <Fragment>
        {vertical ? (
          <VStack display="flex" justify="space-between">
            {allButtons}
          </VStack>
        ) : (
          <HStack justify="flex-end" spacing={1}>
            {allButtons}
          </HStack>
        )}
      </Fragment>
    )
  }
)

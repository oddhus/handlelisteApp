import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../stores/store'
import {
  Table,
  Tbody,
  Td,
  Tr,
  Thead,
  Th,
  IconButton,
  Center,
  Text,
  HStack,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IRecipe } from '../../models/recipe'

interface Props {
  recipes: IRecipe[]
  editable: boolean
  deleteable: boolean
}

export const RecipeList: React.FC<Props> = observer(
  ({ recipes, deleteable, editable }) => {
    const { recipeStore } = useStore()
    const history = useHistory()

    return (
      <Fragment>
        {recipes.length === 0 ? (
          <Center>
            <Text>No recipes found...</Text>
          </Center>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                {(editable || deleteable) && <Th isNumeric>Actions</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {recipes.map((recipe) => (
                <Tr
                  key={recipe.recipeID}
                  onClick={() => history.push(`recipe/${recipe.recipeID}`)}
                  _hover={{
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 18px 43px',
                    cursor: 'pointer',
                  }}
                >
                  <Td>{recipe.recipeName}</Td>
                  {(editable || deleteable) && (
                    <Td>
                      <HStack justify="flex-end">
                        {editable && (
                          <IconButton
                            colorScheme="yellow"
                            aria-label="Edit recipe"
                            size="md"
                            className="edit"
                            onClick={() =>
                              history.push(`create-recipe/${recipe.recipeID}`)
                            }
                            icon={<EditIcon />}
                          />
                        )}
                        {deleteable && (
                          <IconButton
                            colorScheme="red"
                            aria-label="Delete recipe"
                            size="md"
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
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Fragment>
    )
  }
)

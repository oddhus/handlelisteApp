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
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react'
import { RecipeActionButtons } from './RecipeActionButtons'

interface Props {
  editable: boolean
  deleteable: boolean
}

export const RecipeList: React.FC<Props> = observer(
  ({ deleteable, editable }) => {
    const { recipeStore, settingStore } = useStore()
    const history = useHistory()

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
          <Text>{settingStore.language.noRecipesFound}</Text>
        </Center>
      )
    }

    return (
      <Fragment>
        <Table>
          <Thead>
            <Tr>
              <Th>{settingStore.language.recipeName}</Th>
              {(editable || deleteable) && <Th isNumeric>Actions</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {(recipeStore.currentRecipeList || []).map((recipe) => (
              <Tr
                key={recipe.recipeID}
                _hover={{
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 18px 43px',
                  cursor: 'pointer',
                }}
              >
                <Td onClick={() => history.push(`recipe/${recipe.recipeID}`)}>
                  {recipe.recipeName}
                </Td>
                <Td>
                  <RecipeActionButtons
                    recipe={recipe}
                    addable
                    editable={editable}
                    deleteable={deleteable}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Fragment>
    )
  }
)

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useStore } from '../../stores/store'

interface Props {
  onSelectShoppingList: Function
}

export const SelectShoppingList: React.FC<Props> = observer(
  ({ onSelectShoppingList }) => {
    const { shoppingListStore } = useStore()
    const history = useHistory()

    useEffect(() => {
      if (shoppingListStore.shoppingLists.length === 0) {
        shoppingListStore.fetchShoppingLists()
      }
    }, [])

    if (
      !shoppingListStore.shoppingList &&
      (!shoppingListStore.shoppingLists ||
        shoppingListStore.shoppingLists.length === 0)
    ) {
      return (
        <VStack>
          <Text>No shopping list found</Text>
          <Button
            onClick={() => history.push('shopping-list/new-shopping-list')}
          >
            Create Shopping List
          </Button>
        </VStack>
      )
    }

    return (
      <Box pt={3}>
        <FormControl>
          <FormLabel>Shopping list</FormLabel>
          <Select
            onChange={(e) => onSelectShoppingList(parseInt(e.target.value))}
            placeholder={'Select shopping list'}
          >
            {shoppingListStore.shoppingLists.map((list) => (
              <option key={list.shoppingListID} value={list.shoppingListID}>
                {list.updatedOn}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
    )
  }
)

import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../stores/store'

export const SelectShoppingList = observer(() => {
  const { shoppingListStore } = useStore()

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
        <Button>Create Shopping List</Button>
      </VStack>
    )
  }

  return (
    <FormControl>
      <FormLabel>Shopping list</FormLabel>
      <Select
        onChange={(e) =>
          shoppingListStore.getShoppinglist(parseInt(e.target.value))
        }
        placeholder={shoppingListStore.shoppingList.updatedOn}
      >
        {shoppingListStore.shoppingLists.map((list) => (
          <option key={list.shoppingListID} value={list.shoppingListID}>
            {list.updatedOn}
          </option>
        ))}
      </Select>
    </FormControl>
  )
})

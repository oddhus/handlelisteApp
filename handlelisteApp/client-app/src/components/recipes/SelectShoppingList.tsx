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
    const { shoppingListStore, modalStore, settingStore } = useStore()
    const history = useHistory()

    useEffect(() => {
      if (shoppingListStore.shoppingLists.length === 0) {
        shoppingListStore.fetchShoppingLists()
      }
    }, [])

    return (
      <Box pt={3}>
        <Text fontWeight="600" fontSize="xl">
          {settingStore.language.addRecipeToShoppingList}
        </Text>
        <FormControl pt={3}>
          {shoppingListStore.shoppingLists.length === 0 ? (
            <Box>
              <Text>{settingStore.language.noShoppingListFound}</Text>
              <Button
                variant="outline"
                colorScheme="green"
                onClick={() => {
                  modalStore.closeModal()
                  history.push('/shopping-list/new-shopping-list')
                }}
              >
                {settingStore.language.createShoppingList}
              </Button>
            </Box>
          ) : (
            <Select
              onChange={(e) => onSelectShoppingList(parseInt(e.target.value))}
              placeholder={
                shoppingListStore.backToMyShoppingList
                  ? shoppingListStore.shoppingList.name
                  : settingStore.language.selectShoppingList
              }
            >
              {shoppingListStore.shoppingLists.map((list) => (
                <option key={list.shoppingListID} value={list.shoppingListID}>
                  {list.name}
                </option>
              ))}
            </Select>
          )}
        </FormControl>
      </Box>
    )
  }
)

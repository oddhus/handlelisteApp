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
        <FormControl>
          <FormLabel>{settingStore.language.shoppingList}</FormLabel>
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
              placeholder={settingStore.language.selectShoppingList}
            >
              {shoppingListStore.shoppingLists.map((list) => (
                <option key={list.shoppingListID} value={list.shoppingListID}>
                  {list.updatedOn}
                </option>
              ))}
            </Select>
          )}
        </FormControl>
      </Box>
    )
  }
)
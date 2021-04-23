import {
  VStack,
  Text,
  Button,
  Grid,
  GridItem,
  Box,
  Checkbox,
  HStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useStore } from '../../stores/store'
import { Iitem, IShoppingList } from '../../models/ShoppingList'
import { runInAction } from 'mobx'

interface Props {}

interface CheckedItems {
  isChecked: boolean
  item: Iitem
}

export const AddItemsFromLastTrip: React.FC<Props> = observer(() => {
  const { shoppingListStore, modalStore, settingStore } = useStore()

  const [lastShopingList, setLastShoppinglist] = useState<IShoppingList>()
  const [items, setItems] = useState<CheckedItems[]>([])

  useEffect(() => {
    if (shoppingListStore.shoppingLists.length > 1) {
      setLastShoppinglist(shoppingListStore.shoppingLists[1])
      const notBought = lastShopingList?.items.filter(
        (item) => item.hasBeenBought === false
      )
      notBought &&
        notBought.forEach((item) => {
          setItems((items) => [...items, { isChecked: false, item: item }])
        })
    }
  }, [lastShopingList, shoppingListStore.shoppingLists])

  const addItemsToShoppingList = () => {
    items &&
      items.forEach((item: CheckedItems) => {
        if (item.isChecked) {
          shoppingListStore.addItem(item.item)
        }
      })
    runInAction(() => {
      modalStore.closeModal()
      shoppingListStore.saveShoppinglist()
    })
  }

  const onChecked = (item: CheckedItems) => {
    setItems(
      items.map((checkedItem) => {
        if (checkedItem.item.itemName === item.item.itemName) {
          checkedItem.isChecked = !checkedItem.isChecked
        }
        return checkedItem
      })
    )
  }

  return (
    <VStack spacing="2">
      <Text fontWeight="600" fontSize="xl" pt={5}>
        {settingStore.language.addItemsFromLastTrip}
      </Text>
      <Box minW="100%">
        {items &&
          items.map((item: CheckedItems, i: number) => (
            <Grid
              key={item.item.itemIdentifier}
              templateColumns="repeat(18, 1fr)"
              gap={1}
              color={item.item.hasBeenBought ? 'rgba(0,0,0,0.3)' : ''}
              minW="100%"
            >
              <GridItem colSpan={2} alignItems="center">
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  minW="100%"
                  minH="100%"
                >
                  <Checkbox
                    data-cy="item-add-checkbox"
                    isChecked={item.isChecked}
                    colorScheme="brand"
                    size="lg"
                    onChange={() => onChecked(item)}
                  />
                </Box>
              </GridItem>

              <GridItem colSpan={[8, 8, 11]}>
                <Box display="flex" alignItems="center" minW="100%" minH="100%">
                  <Text>{item.item.itemName}</Text>
                </Box>
              </GridItem>
            </Grid>
          ))}
      </Box>
      <Box minW="100%">
        <HStack spacing="2" justifyContent="flex-end">
          <Button
            onClick={() => {
              modalStore.closeModal()
            }}
          >
            {settingStore.language.noThanks}
          </Button>
          <Button data-cy="add-items" colorScheme="brand" onClick={() => addItemsToShoppingList()}>
            {settingStore.language.add}
          </Button>
        </HStack>
      </Box>
    </VStack>
  )
})

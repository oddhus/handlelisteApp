import { Center, VStack, Box, Button, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { IitemInRecipe } from '../../models/recipe'
import { useStore } from '../../stores/store'
import { ItemList } from './ItemList'
import { SelectShoppingList } from './SelectShoppingList'

interface Props {}

interface CheckedItems {
  isChecked: boolean
  item: IitemInRecipe
}

export const RecipeToShoppingList: React.FC<Props> = observer(() => {
  const {
    settingStore,
    recipeStore,
    shoppingListStore,
    modalStore,
  } = useStore()
  const [checked, setCheckedItems] = useState<CheckedItems[]>([])

  useEffect(() => {
    if (recipeStore.currentRecipe) {
      recipeStore.currentRecipe.items.forEach((item) => {
        setCheckedItems((items) => [...items, { isChecked: true, item }])
      })
    }
  }, [])

  const onChecked = (item: IitemInRecipe) => {
    setCheckedItems(
      checked.map((checkedItem) => {
        if (checkedItem.item.itemName === item.itemName) {
          checkedItem.isChecked = !checkedItem.isChecked
        }
        return checkedItem
      })
    )
  }

  const onAddToShoppingList = () => {
    checked.forEach((checkedItem) => {
      console.log(checkedItem)
      if (checkedItem.isChecked) {
        shoppingListStore.addItem({
          ...checkedItem.item,
          hasBeenBought: false,
          category: recipeStore.currentRecipe!.recipeName,
        })
      }
    })
    shoppingListStore.saveShoppinglist()
    modalStore.closeModal()
  }

  if (!recipeStore.currentRecipe) {
    return (
      <Box minW="100%">
        <Center>
          <Text>No recipe selected... Please try again</Text>
        </Center>
      </Box>
    )
  }

  return (
    <VStack alignItems="flex-start">
      <SelectShoppingList />
      <Box minW="100%">
        <Center>
          <Text fontSize="xl">{recipeStore.currentRecipe!.recipeName}</Text>
        </Center>
      </Box>
      <Box minW="100%">
        <ItemList
          items={recipeStore.currentRecipe!.items}
          addTick
          onChecked={onChecked}
        />
      </Box>
      <Box minW="100%">
        <Center>
          <Button onClick={() => onAddToShoppingList()} colorScheme="green">
            Add
          </Button>
        </Center>
      </Box>
    </VStack>
  )
})

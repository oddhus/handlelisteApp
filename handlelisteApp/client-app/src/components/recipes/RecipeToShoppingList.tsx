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
  const [selectedShoppingList, setSelectedShoppingList] = useState<
    number | undefined
  >(undefined)

  useEffect(() => {
    if (recipeStore.currentRecipe) {
      recipeStore.currentRecipe.items.forEach((item) => {
        setCheckedItems((items) => [...items, { isChecked: true, item }])
      })
    }
  }, [recipeStore.currentRecipe])

  const onSelectShoppingList = (id: number) => {
    if (id) {
      setSelectedShoppingList(id)
      shoppingListStore.getShoppinglist(id)
    }
  }

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
      if (checkedItem.isChecked) {
        shoppingListStore.addItem({
          ...checkedItem.item,
          hasBeenBought: false,
          category: recipeStore.currentRecipe!.recipeName,
        })
      }
    })
    recipeStore.setToastSuccessMessage(
      settingStore.language.recipeAddedToShoppingList
    )
    shoppingListStore.saveShoppinglist()
    modalStore.closeModal()
  }

  if (!recipeStore.currentRecipe) {
    return (
      <Box minW="100%">
        <Center>
          <Text>{settingStore.language.noRecipeSelected}</Text>
        </Center>
      </Box>
    )
  }

  return (
    <VStack alignItems="flex-start">
      <SelectShoppingList onSelectShoppingList={onSelectShoppingList} />
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
          <Button
            disabled={!selectedShoppingList}
            onClick={() => onAddToShoppingList()}
            colorScheme="green"
          >
            {settingStore.language.add}
          </Button>
        </Center>
      </Box>
    </VStack>
  )
})

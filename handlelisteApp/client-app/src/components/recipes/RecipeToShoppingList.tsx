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
  const [numberOfItems, setNumberOfItems] = useState<number[]>()
  const [checked, setCheckedItems] = useState<CheckedItems[]>([])
  const [selectedShoppingList, setSelectedShoppingList] = useState<
    number | undefined
  >(undefined)

  useEffect(() => {
    if (recipeStore.currentRecipe) {
      recipeStore.currentRecipe.items.forEach((item) => {
        setCheckedItems((items) => [...items, { isChecked: true, item }])
      })
      setNumberOfItems(Array(recipeStore.currentRecipe.items.length).fill(1))
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

  const onChangeNumberOfItems = (value: number, index: number) => {
    if (numberOfItems) {
      setNumberOfItems([
        ...numberOfItems.slice(0, index),
        value ? value : 0,
        ...numberOfItems.slice(index + 1),
      ])
    }
  }

  const onAddToShoppingList = () => {
    checked.forEach((checkedItem, i) => {
      if (checkedItem.isChecked && numberOfItems && numberOfItems[i] > 0) {
        shoppingListStore.addItem({
          ...checkedItem.item,
          quantity: numberOfItems[i],
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
    <VStack alignItems="flex-start" p={0}>
      <SelectShoppingList onSelectShoppingList={onSelectShoppingList} />
      <Box minW="100%">
        <Center pt={2}>
          <Text fontSize="xl" as="i">
            {recipeStore.currentRecipe!.recipeName}
          </Text>
        </Center>
      </Box>
      <Box minW="100%">
        <ItemList
          items={recipeStore.currentRecipe!.items}
          addTick
          onChecked={onChecked}
          onChangeNumberOfItems={onChangeNumberOfItems}
          numberOfItems={numberOfItems}
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

import {
  Center,
  VStack,
  Box,
  Button,
  Text,
  HStack,
  Checkbox,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { IitemInRecipe } from '../../models/recipe'
import { useStore } from '../../stores/store'
import { ItemList } from './ItemList'
import { SelectShoppingList } from './SelectShoppingList'
import { useHistory } from 'react-router-dom'
import { RecipeFavoriteButton } from './RecipeFavoriteButton'

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
  const [addToFavourites, setAddToFavourites] = useState(true)

  const history = useHistory()

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

  const onAddToShoppingList = (
    returnToList: boolean,
    addToFavorites: boolean
  ) => {
    if (
      recipeStore.currentRecipe &&
      !recipeStore.currentRecipe.hasLiked &&
      addToFavorites
    ) {
      recipeStore.likeOrRemoveLikeOnRecipe(recipeStore.currentRecipe)
    }
    shoppingListStore.addToShoppingListFromRecipe(
      checked,
      numberOfItems,
      returnToList
    )
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
          <HStack spacing={4}>
            <Text fontSize="xl" as="i">
              {recipeStore.currentRecipe!.recipeName}
            </Text>
            <RecipeFavoriteButton recipe={recipeStore.currentRecipe} />
          </HStack>
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
      <Box minW="100%" pt={3}>
        <Center>
          <VStack>
            {!recipeStore.currentRecipe.hasLiked && (
              <Checkbox
                isDisabled={
                  !selectedShoppingList &&
                  !shoppingListStore.backToMyShoppingList
                }
                colorScheme="brand"
                isChecked={addToFavourites}
                onChange={() => setAddToFavourites(!addToFavourites)}
              >
                <Text as="i">Save recipe when adding to shopping list</Text>
              </Checkbox>
            )}
            <HStack>
              <Button
                disabled={
                  !selectedShoppingList &&
                  !shoppingListStore.backToMyShoppingList
                }
                onClick={() => onAddToShoppingList(false, addToFavourites)}
                colorScheme="brand"
              >
                {settingStore.language.add}
              </Button>
              {!!shoppingListStore.backToMyShoppingList && (
                <Button
                  disabled={
                    !selectedShoppingList &&
                    !shoppingListStore.backToMyShoppingList
                  }
                  onClick={() => onAddToShoppingList(true, addToFavourites)}
                  colorScheme="brand"
                >
                  Add and return
                </Button>
              )}
            </HStack>
          </VStack>
        </Center>
      </Box>
    </VStack>
  )
})

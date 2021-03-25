import { DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Checkbox,
  Text,
  Grid,
  GridItem,
  Input,
  NumberInput,
  NumberInputField,
  Box,
  HStack,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import React, {ChangeEvent, useEffect, useState} from 'react'
import { Iitem } from '../../models/ShoppingList'
import { useStore } from '../../stores/store'

interface Props {
  item: Iitem
}

/*
 * Sets up the table body and returns the table.
 *
 * @param itemsList:        An categorized list of items. (Only items with the same category)
 * @param edit:             Boolean value to tell if the list should be in edit mode or not. (Delete icon or checkbox etc..)
 * @param onDeleteItem:     Function that handles what to do when the trashcan icon is clicked
 * @param onChangeQunatity: Function to handle what to do when clicking (-) or (+) buttons
 * @returns                 Returns a list containing the react elements for the table body, with the correct item information.
 */
export const Item: React.FC<Props> = observer(({ item }) => {
  const { shoppingListStore } = useStore()
  const [isRead, setIsRead] = useState(true)

  useEffect(() => {
    if (item && item.itemName === '') {
      setIsRead(false)
    }
  }, [item])

  return (
    <Grid
      templateColumns="repeat(18, 1fr)"
      gap={1}
      color={item.hasBeenBought ? 'rgba(0,0,0,0.3)' : ''}
    >
      <GridItem
        colSpan={2}
        onClick={(e) => shoppingListStore.onChecked(item)}
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          minW="100%"
          minH="100%"
        >
          <Checkbox
            isChecked={item.hasBeenBought}
            onChange={() => shoppingListStore.onChecked(item)}
            colorScheme="green"
            size="lg"
          />
        </Box>
      </GridItem>

      <GridItem colSpan={8}>
        {isRead ? (
          <Box
            onClick={() => setIsRead(false)}
            display="flex"
            alignItems="center"
            minW="100%"
            minH="100%"
          >
            <Text>{item.itemName}</Text>
          </Box>
        ) : (
          <Input
            variant="flushed"
            placeholder="New Item"
            value={item.itemName}
            onChange={(e:ChangeEvent<HTMLInputElement>) => {
              shoppingListStore.setItemName(item, e.target.value)
            }}
          />
        )}
      </GridItem>
      <GridItem colSpan={6}>
        <HStack pr={5} pl={[0, 5, 10]}>
          <NumberInput
            onChange={(valueString) =>
              shoppingListStore.setQuantity(item, parseInt(valueString))
            }
            value={item.quantity.toString()}
            min={0}
            max={999}
            allowMouseWheel
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </GridItem>

      <GridItem colSpan={2} justifyContent="flex-end">
        <Box minW="100%" justifyContent="flex-end" display="flex">
          <IconButton
            colorScheme="red"
            aria-label="delete item"
            size="md"
            className="edit"
            onClick={() => shoppingListStore.onDeleteItem(item)}
            icon={<DeleteIcon />}
          />
        </Box>
      </GridItem>
    </Grid>
  )
})

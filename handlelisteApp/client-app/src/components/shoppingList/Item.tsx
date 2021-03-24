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

import React, { useEffect, useState } from 'react'
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
    if (item.itemName === '') {
      setIsRead(false)
    }
  }, [item.itemName])

  return (
    <Grid
      templateColumns="repeat(18, 1fr)"
      gap={2}
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

      <GridItem colSpan={9}>
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
            placeholder="Item"
            value={item.itemName}
            onBlur={() => setIsRead(true)}
            onChange={(e) => {
              shoppingListStore.setItemName(item, e.target.value)
            }}
          />
        )}
      </GridItem>
      <GridItem colSpan={5}>
        <HStack pr={5}>
          {/* <IconButton
            m={1}
            colorScheme="teal"
            aria-label="Call Segun"
            size="small"
            isRound
            className="edit"
            isDisabled={item.quantity <= 1}
            onClick={() => shoppingListStore.changeQuantity(item, false)}
            icon={<ChevronLeftIcon />}
          /> */}

          <NumberInput
            onChange={(valueString) =>
              shoppingListStore.setQuantity(item, parseInt(valueString))
            }
            value={item.quantity.toString()}
            max={999}
            allowMouseWheel
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {/* <IconButton
            m={1}
            colorScheme="teal"
            aria-label="Call Segun"
            isRound
            size="small"
            className="edit"
            onClick={() => shoppingListStore.changeQuantity(item, true)}
            icon={<ChevronRightIcon />}
          /> */}
        </HStack>
      </GridItem>

      <GridItem colSpan={2} justifyContent="flex-end">
        <Box minW="100%" justifyContent="flex-end" display="flex">
          <IconButton
            colorScheme="red"
            aria-label="Call Segun"
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

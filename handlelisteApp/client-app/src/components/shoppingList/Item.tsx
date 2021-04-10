import { DeleteIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Checkbox,
  Text,
  Grid,
  GridItem,
  Input,
  Box,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { Iitem } from '../../models/ShoppingList'
import { useStore } from '../../stores/store'
import { ItemAmount } from './ItemAmount'

interface Props {
  item: Iitem
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
}

export const Item: React.FC<Props> = observer(
  ({ item, provided, snapshot }) => {
    const { shoppingListStore } = useStore()
    const [isRead, setIsRead] = useState(true)

    useEffect(() => {
      if (item && item.itemName === '') {
        setIsRead(false)
      }
    }, [item])

    const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        shoppingListStore.insertEmptyItem()
      }
    }

    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Grid
          templateColumns="repeat(18, 1fr)"
          gap={1}
          color={item.hasBeenBought ? 'rgba(0,0,0,0.3)' : ''}
          backgroundColor={snapshot.isDragging ? 'green.100' : 'white'}
          p={1}
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
                isChecked={item.hasBeenBought}
                onChange={() => shoppingListStore.onChecked(item)}
                colorScheme="green"
                size="lg"
              />
            </Box>
          </GridItem>

          <GridItem colSpan={[8, 8, 11]}>
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
                autoFocus
                onBlur={() => {
                  setIsRead(item.itemName !== '')
                  shoppingListStore.CreateOrUpdateItemInShoppingList(item)
                }}
                onKeyDown={(e: any) => {
                  handleKeyDown(e)
                }}
                value={item.itemName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  shoppingListStore.setItemName(item, e.target.value)
                }}
              />
            )}
          </GridItem>
          <GridItem colSpan={[5, 6, 3]}>
            <ItemAmount item={item} />
          </GridItem>
          <GridItem colSpan={[3, 2]} justifyContent="flex-end">
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
      </div>
    )
  }
)

import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../stores/store'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ShoppingListItems } from './ShoppingListItems'
import { Center, Text } from '@chakra-ui/react'

interface Props {}
export const ShoppingList: React.FC<Props> = observer(() => {
  const { shoppingListStore, settingStore } = useStore()

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return
    const items = Array.from(shoppingListStore.shoppingList.items)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    shoppingListStore.setItems(items)
    shoppingListStore.onUpdateOrder()
  }

  return (
    <React.Fragment>
      {shoppingListStore.shoppingList.items.length === 0 ? (
        <Center>
          <Text>{settingStore.language.noItems}</Text>
        </Center>
      ) : (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="items">
            {(provided) => <ShoppingListItems provided={provided} />}
          </Droppable>
        </DragDropContext>
      )}
    </React.Fragment>
  )
})

import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { useStore } from '../../stores/store'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ShoppingListItems } from './ShoppingListItems'
import { Center, Text } from '@chakra-ui/react'
import { debounce } from 'lodash'

interface Props {}
export const ShoppingList: React.FC<Props> = observer(() => {
  const { shoppingListStore, settingStore } = useStore()

  const debouncedSave = useRef(
    debounce(() => shoppingListStore.setOrder(), 2000)
  ).current

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return
    const items = Array.from(shoppingListStore.shoppingList.items)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    shoppingListStore.setItems(items)
    debouncedSave()
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

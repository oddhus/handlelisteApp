import { VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../stores/store'
import { Item } from './Item'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'
interface Props {
  provided: DroppableProvided
}
export const ShoppingListItems: React.FC<Props> = observer(({ provided }) => {
  const { shoppingListStore } = useStore()

  return (
    <VStack {...provided.droppableProps} ref={provided.innerRef}>
      {shoppingListStore.shoppingList.items.map((item, index) => (
        <Draggable
          key={item.itemIdentifier}
          draggableId={item.itemIdentifier!.toString()}
          index={index}
        >
          {(provided, snapshot) => (
            <Item
              item={item}
              key={item.itemIdentifier}
              provided={provided}
              snapshot={snapshot}
            />
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </VStack>
  )
})

import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../stores/store'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { ShoppingListItems } from './ShoppingListItems'
import { ItemAmount } from './ItemAmount'
interface Props {}
export const ShoppingList: React.FC<Props> = observer(() => {
  const { shoppingListStore } = useStore()

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return
    const items = Array.from(shoppingListStore.shoppingList.items)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    shoppingListStore.shoppingList.items = items
  }

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items">
          {(provided) => <ShoppingListItems provided={provided} />}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  )
})

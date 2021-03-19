import React from 'react'
import { Box } from '@chakra-ui/react'
import { Iitem } from '../../models/ShoppingList'
import { observer } from 'mobx-react-lite'
import { TableComponent } from './TableComponent'

interface Props {
  items: Iitem[]
  edit: Boolean
  onChangeQuantity: Function
  deleteItem: Function
  onChecked: Function
}

/*
 * Returns a a list of each unique category in the items list.
 */
const getListOfCategories = (itemsList: { category: string }[]) => {
  if (itemsList.length === 0) {
    return []
  }
  let categoryList: string[] = []
  itemsList.forEach((items) => {
    if (
      items.category &&
      !categoryList.includes(items.category.toLowerCase())
    ) {
      categoryList.push(items.category.toLowerCase())
    }
  })
  return categoryList
}

export const ListComponent: React.FC<Props> = observer(
  ({ items, edit, deleteItem, onChangeQuantity, onChecked }) => {
    const categories = getListOfCategories(items)
    return (
      <Box>
        <TableComponent
          itemsList={items}
          edit={edit}
          categories={categories}
          onDeleteItem={deleteItem}
          onChangeQuantity={onChangeQuantity}
          onChecked={onChecked}
        />
      </Box>
    )
  }
)

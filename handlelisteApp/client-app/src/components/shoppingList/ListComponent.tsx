import React, { useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  Box,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons'
import { Iitem } from '../../models/ShoppingList'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite'

interface Props {
  items: Iitem[]
  edit: Boolean
  onChangeQuantity: Function
  deleteItem: Function
  onChecked: Function
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
const setupTableBody = (
  itemsList: Iitem[],
  edit: Boolean,
  onDeleteItem: Function,
  onChangeQuantity: Function,
  onChecked: Function
) => {
  return itemsList.map((item) => (
    <Tr
      color={item.hasBeenBought && !edit ? 'rgba(0,0,0,0.3)' : ''}
      key={item.itemName}
    >
      <Td>
        {edit ? (
          <IconButton
            colorScheme="red"
            aria-label="Call Segun"
            size="md"
            className="edit"
            onClick={() => onDeleteItem(item)}
            icon={<DeleteIcon />}
          />
        ) : (
          <Checkbox
            isChecked={item.hasBeenBought}
            onChange={(e) => onChecked(item)}
            colorScheme="green"
          />
        )}
      </Td>
      <Td>{item.itemName}</Td>
      {edit ? (
        <Td pl={7}>
          <IconButton
            m={1}
            colorScheme="teal"
            aria-label="Call Segun"
            size="small"
            isRound
            className="edit"
            isDisabled={item.quantity <= 1}
            onClick={() => onChangeQuantity(item, false)}
            icon={<ChevronLeftIcon />}
          />
          {item.quantity}
          <IconButton
            m={1}
            colorScheme="teal"
            aria-label="Call Segun"
            size="small"
            isRound
            className="edit"
            onClick={() => onChangeQuantity(item, true)}
            icon={<ChevronRightIcon />}
          />
        </Td>
      ) : (
        <Td pl={'50px'}>{item.quantity}</Td>
      )}
      <Td>{item.unit}</Td>
    </Tr>
  ))
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

    const [toShow, setToShow] = useState(
      new Array(categories.length).fill(true)
    )
    const { settingStore } = useStore()

    const setupTables = (itemsList: Iitem[], edit: Boolean) => {
      var tables: React.ReactFragment[] = []
      const strictHeaders = settingStore.language.shoppingList

      //Makes it so new tables (categories) "spawn" with visible body.
      if (categories.length > toShow.length)
        setToShow(new Array(categories.length).fill(true))

      // For each category make a list that contains the correct items.
      categories.forEach((category, index) => {
        let categorizedItems = itemsList.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        )
        tables.push(
          <div key={category}>
            <Table variant="simple">
              <Thead bg={'#bee3f8'}>
                <Tr>
                  <Th>
                    <IconButton
                      m={1}
                      className={'displayTableBtn'}
                      colorScheme="#bee3f8"
                      aria-label="Call Segun"
                      size="small"
                      data-testid={'hide/show ' + category}
                      onClick={() => {
                        toShow[index] = !toShow[index]
                        setToShow([...toShow])
                      }}
                      icon={
                        toShow[index] ? (
                          <TriangleDownIcon color="black" />
                        ) : (
                          <TriangleUpIcon color="black" />
                        )
                      }
                    />
                  </Th>
                  <Th className={category} w={'20%'} color="black">
                    {category}
                  </Th>
                  <Th color="black">{strictHeaders[0]}</Th>
                  <Th color="black">{strictHeaders[1]}</Th>
                </Tr>
              </Thead>
              {toShow[index] ? ( // Checks the toShow list if that tablebody should be visible.
                <Tbody>
                  {setupTableBody(
                    categorizedItems,
                    edit,
                    deleteItem,
                    onChangeQuantity,
                    onChecked
                  )}
                </Tbody>
              ) : null}
            </Table>
            <br />
          </div>
        )
      })
      return tables
    }
    return <Box>{setupTables(items, edit)}</Box>
  }
)

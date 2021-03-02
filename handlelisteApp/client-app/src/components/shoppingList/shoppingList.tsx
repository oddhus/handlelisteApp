import React from 'react';
import { Language } from '../../lang/ActiveLanguage';
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
} from '@chakra-ui/react';
import {
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon
} from '@chakra-ui/icons';
import { Iitem } from '../../models/ShoppingList';

interface Props {
  items: Iitem[],
  edit: Boolean,
  onIncrement: Function,
  onDecrement: Function,
  deleteItem: Function
}

const setupTableBody = (itemsList: Iitem[], edit: Boolean, onDeleteItem: Function, onIncrement: Function, onDecrement: Function) => {
  return itemsList.map((item) => (
    <Tr key={item.product}>
      <Td>
        {edit ? (
                    <IconButton
                    colorScheme='red'
                    aria-label='Call Segun'
                    size='md'
                    onClick={() => onDeleteItem(item)}
                    icon={<DeleteIcon />}
                  />
        )
      :
      (
        <Checkbox colorScheme='green' />
      )}
      </Td>
      <Td>{item.product}</Td>
      {edit ? (
        <Td>
          <IconButton
            m={1}
            colorScheme='teal'
            aria-label='Call Segun'
            size='small'
            isRound
            isDisabled={item.quantity <= 1}
            onClick={() => onDecrement(item)}
            icon={<ChevronLeftIcon />}
          />
          {item.quantity}
          <IconButton
                      m={1}
            colorScheme='teal'
            aria-label='Call Segun'
            size='small'
            isRound
            onClick={() => onIncrement(item)}
            icon={<ChevronRightIcon />}
          />
        </Td>
      ) : (
        <Td>{item.quantity}</Td>
      )}
      <Td>{item.unit}</Td>
    </Tr>
  ))
}

const getListOfCategories = (itemsList: { category: string }[]) => {
  let categoryList: string[] = []
  itemsList.map((items) => {
      if (!categoryList.includes(items.category.toLowerCase())) {
      categoryList.push(items.category.toLowerCase())
    }
  })
  return categoryList
}

export const ListComponent: React.FC<Props> = ({ items, edit, deleteItem, onIncrement, onDecrement }) => {
  const setupTables = (itemsList: Iitem[], edit: Boolean) => {
    var categories: string[] = getListOfCategories(itemsList)
    var tables: React.ReactFragment[] = []
    var strictHeaders = Language.shoppingList()
    categories.map((category) => {
      let categorizedItems: Iitem[] = []
      itemsList.map((item) => {
        if (category === item.category.toLowerCase()) {
          categorizedItems.push(item)
        }
      })
      tables.push(
        <div key={category}>
          <Table  
          variant='simple'>
            <Thead bg={'#bee3f8'}>
              <Tr>
                <Th>
                  <ArrowDownIcon />
                </Th>
                <Th>{category}</Th>
                <Th>{strictHeaders[0]}</Th>
                <Th>{strictHeaders[1]}</Th>
              </Tr>
            </Thead>
            <Tbody>{setupTableBody(categorizedItems, edit, deleteItem, onIncrement, onDecrement)}</Tbody>
          </Table>
          <br />
        </div>
      )
    })
    return tables
  }
  return <Box>{setupTables(items, edit)}</Box>
}

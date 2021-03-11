import React, { useState } from 'react';
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
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import { Iitem } from '../../models/ShoppingList';
import {useStore} from "../../stores/store";
import SettingStore from "../../stores/settingStore";

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
                    className='edit'
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
        <Td pl={7}>
          <IconButton
            m={1}
            colorScheme='teal'
            aria-label='Call Segun'
            size='small'
            isRound
            className='edit'
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
            className='edit'
            onClick={() => onIncrement(item)}
            icon={<ChevronRightIcon />}
          />
        </Td>
      ) : (
        <Td pl={"50px"}>{item.quantity}</Td>
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
  const [toShow, setToShow] = useState(new Array(getListOfCategories(items).length).fill(true))
  const {settingStore} = useStore()

  const setupTables = (itemsList: Iitem[], edit: Boolean) => {
    var categories: string[] = getListOfCategories(itemsList)
    var tables: React.ReactFragment[] = []
    var strictHeaders = settingStore.language.shoppingList
    let start = 0 

    categories.forEach((category) => {
      let index = start ++
      let categorizedItems: Iitem[] = []
      itemsList.map((item) => {
        if (category === item.category.toLowerCase()) {
          categorizedItems.push(item)
        }
      })
      tables.push(
        <div key={category}>
          <Table variant="simple">
            <Thead bg={"#bee3f8"}>
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
                    } }
                    icon={
                      toShow[index] ? (
                        <TriangleDownIcon color="black" />
                      ) : (
                        <TriangleUpIcon color="black" />
                      )
                    }
                  />
                </Th>
                <Th
                className={category}
                w={"20%"}
                color="black">{category}</Th>
                <Th color="black">{strictHeaders[0]}</Th>
                <Th color="black">{strictHeaders[1]}</Th>
              </Tr>
            </Thead>
             {
               toShow[index] ?               
               <Tbody>
               {setupTableBody(
                 categorizedItems,
                 edit,
                 deleteItem,
                 onIncrement,
                 onDecrement
               )}
             </Tbody>
             : 
             null
             }
          </Table>
          <br />
        </div>
      );
    })
    return tables
  }
  return <Box>{setupTables(items, edit)}</Box>
}

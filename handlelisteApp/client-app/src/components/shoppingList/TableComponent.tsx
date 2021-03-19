import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Table, Thead, Tr, Th, IconButton, Tbody } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Iitem } from '../../models/ShoppingList'
import { useStore } from '../../stores/store'
import { ListBody } from './ListBody'

interface Props {
  itemsList: Iitem[]
  edit: Boolean
  categories: String[]
  onDeleteItem: Function
  onChangeQuantity: Function
  onChecked: Function
}

export const TableComponent: React.FC<Props> = ({
  itemsList,
  edit,
  categories,
  onDeleteItem,
  onChangeQuantity,
  onChecked,
}) => {
  const { settingStore } = useStore()
  const [toShow, setToShow] = useState(new Array())

  useEffect(() => {
    // Everything spawns as visible
    setToShow(new Array(categories.length).fill(true))
  }, [categories])

  // When all items in a category is checked, close it
  const itemChecked = (item: Iitem) => {
    if (!edit) {
      onChecked(item)
      const categorizedItems = itemsList.filter(
        (itemToCheck) =>
          item.category.toLowerCase() === itemToCheck.category.toLowerCase()
      )
      const categoryIndex = categories.indexOf(item.category.toLowerCase())
      const shouldShowCategory = categorizedItems.every(
        (item) => item.hasBeenBought === true
      )
      let shouldShow = toShow
      shouldShow[categoryIndex] = !shouldShowCategory
      setToShow([...shouldShow])
    }
  }

  return (
    <React.Fragment>
      {
        // For each category make a list that contains the correct items.
        categories.map((category, index) => {
          let categorizedItems = itemsList.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          )
          return (
            <div key={category + ' ' + index}>
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
                    <Th
                      className={category + ' ' + index}
                      w={'20%'}
                      color="black"
                    >
                      {category.length > 12
                        ? category.substr(0, 11) + '...'
                        : category}
                    </Th>
                    <Th color="black">
                      {settingStore.language.shoppingList[0]}
                    </Th>
                    <Th color="black">
                      {settingStore.language.shoppingList[1]}
                    </Th>
                  </Tr>
                </Thead>
                {toShow[index] ? ( // Checks the toShow list if that tablebody should be visible.
                  <Tbody>
                    <ListBody
                      itemsList={categorizedItems}
                      edit={edit}
                      onDeleteItem={onDeleteItem}
                      onChangeQuantity={onChangeQuantity}
                      onChecked={itemChecked}
                    />
                  </Tbody>
                ) : null}
              </Table>
              <br />
            </div>
          )
        })
      }
    </React.Fragment>
  )
}

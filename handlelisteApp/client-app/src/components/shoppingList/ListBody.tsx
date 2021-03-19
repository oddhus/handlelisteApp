import { DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Tr, Td, IconButton, Checkbox, useForceUpdate } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import React from 'react'
import { Iitem } from '../../models/ShoppingList'

interface Props {
  itemsList: Iitem[]
  edit: Boolean
  onDeleteItem: Function
  onChangeQuantity: Function
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
export const ListBody: React.FC<Props> = observer(
  ({ itemsList, edit, onDeleteItem, onChangeQuantity, onChecked }) => {
    return (
      <React.Fragment>
        {itemsList.map((item) => (
          <Tr
            color={item.hasBeenBought && !edit ? 'rgba(0,0,0,0.3)' : ''}
            key={item.itemName}
            onClick={() => onChecked(item)}
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
        ))}
      </React.Fragment>
    )
  }
)

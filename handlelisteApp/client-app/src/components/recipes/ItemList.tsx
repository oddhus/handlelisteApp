import {
  Table,
  Tbody,
  Th,
  Tr,
  Thead,
  Td,
  Center,
  Text,
  Checkbox,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { IitemInRecipe } from '../../models/recipe'

interface Props {
  items: IitemInRecipe[] | undefined | null
  addTick?: boolean
  onChecked?: Function
  onChangeNumberOfItems?: Function
  numberOfItems?: number[]
}

export const ItemList: React.FC<Props> = observer(
  ({ items, addTick, onChecked, onChangeNumberOfItems, numberOfItems }) => {
    if (!items || items.length === 0) {
      return (
        <Center>
          <VStack minW="100%">
            <Text>No items...</Text>
          </VStack>
        </Center>
      )
    }

    return (
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {addTick && onChecked && <Th>Add</Th>}
            <Th>Name</Th>
            <Th isNumeric>Quanitiy</Th>
            <Th>
              {onChangeNumberOfItems && numberOfItems
                ? 'Items to shopping list'
                : 'Unit'}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, i) => {
            return (
              <Tr key={`${item.itemName}-${item.quantity}`}>
                {addTick && onChecked && (
                  <Td>
                    <Checkbox
                      defaultChecked
                      onChange={() => onChecked(item)}
                      colorScheme="green"
                    />
                  </Td>
                )}
                <Td>{item.itemName}</Td>
                <Td isNumeric={!onChangeNumberOfItems || !numberOfItems}>
                  {onChangeNumberOfItems && numberOfItems ? (
                    <Text
                      fontSize="sm"
                      as="i"
                    >{`${item.quantity} ${item.unit}`}</Text>
                  ) : (
                    item.quantity
                  )}
                </Td>
                <Td>
                  {onChangeNumberOfItems && numberOfItems ? (
                    <NumberInput
                      onChange={(value) =>
                        onChangeNumberOfItems(parseInt(value), i)
                      }
                      value={numberOfItems[i]}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  ) : (
                    item.unit
                  )}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
  }
)

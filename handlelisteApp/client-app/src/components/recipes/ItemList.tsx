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
  Divider,
  VStack,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { IitemInRecipe } from '../../models/recipe'

interface Props {
  items: IitemInRecipe[] | undefined | null
  addTick?: boolean
  onChecked?: Function
}

export const ItemList: React.FC<Props> = observer(
  ({ items, addTick, onChecked }) => {
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
      <Table variant="simple">
        <Thead>
          <Tr>
            {addTick && onChecked && <Th>Add</Th>}
            <Th>Name</Th>
            <Th isNumeric>Quanitiy</Th>
            <Th>Unit</Th>
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
                <Td isNumeric>{item.quantity}</Td>
                <Td>{item.unit}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
  }
)
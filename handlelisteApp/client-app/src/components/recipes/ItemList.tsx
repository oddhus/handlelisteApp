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
import { useStore } from '../../stores/store'
import { translateUnit } from '../../utils/TranslateUnit'

interface Props {
  items: IitemInRecipe[] | undefined | null
  addTick?: boolean
  onChecked?: Function
  onChangeNumberOfItems?: Function
  numberOfItems?: number[]
}

export const ItemList: React.FC<Props> = observer(
  ({ items, addTick, onChecked, onChangeNumberOfItems, numberOfItems }) => {
    const { settingStore } = useStore()

    if (!items || items.length === 0) {
      return (
        <Center>
          <VStack minW="100%">
            <Text>{settingStore.language.noIngredients}</Text>
          </VStack>
        </Center>
      )
    }

    translateUnit(items)

    return (
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {addTick && onChecked && <Th>{settingStore.language.add}</Th>}
            <Th>{settingStore.language.ingredients}</Th>
            <Th isNumeric>{settingStore.language.shoppingList[0]}</Th>
            <Th>
              {onChangeNumberOfItems && numberOfItems
                ? 'Items to shopping list'
                : settingStore.language.shoppingList[1]}
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
                      colorScheme="brand"
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

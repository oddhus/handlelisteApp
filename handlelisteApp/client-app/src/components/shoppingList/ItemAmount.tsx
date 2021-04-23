import {
  NumberInput,
  NumberInputField,
  HStack,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Iitem } from '../../models/ShoppingList'
import { useStore } from '../../stores/store'

interface Props {
  item: Iitem
}

export const ItemAmount: React.FC<Props> = observer(({ item }) => {
  const { shoppingListStore } = useStore()

  return (
    <HStack pl={[1, 5]}>
      <NumberInput
        data-cy="number-of-items"
        onChange={(valueString) => {
          shoppingListStore.onSetQuantity(item, parseInt(valueString))
        }}
        value={item.quantity.toString() || 0}
        min={0}
        max={999}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper
            data-cy="item-increment"
            onClick={() => shoppingListStore.onChangeQuantity(item, true)}
          />
          <NumberDecrementStepper
            data-cy="item-decrement"
            onClick={() => shoppingListStore.onChangeQuantity(item, false)}
          />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  )
})

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
        onChange={(valueString) => {
          shoppingListStore.setQuantity(item, parseInt(valueString))
        }}
        value={item.quantity.toString() || 0}
        min={0}
        max={999}
        allowMouseWheel
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper
            onClick={() => shoppingListStore.changeQuantity(item, true)}
          />
          <NumberDecrementStepper
            onClick={() => shoppingListStore.changeQuantity(item, false)}
          />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  )
})

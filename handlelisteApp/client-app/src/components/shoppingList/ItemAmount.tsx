import {
  NumberInput,
  NumberInputField,
  HStack,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { Iitem } from '../../models/ShoppingList'
import { useStore } from '../../stores/store'

interface Props {
  item: Iitem
}

export const ItemAmount: React.FC<Props> = observer(({ item }) => {
  const { shoppingListStore } = useStore()

  const debouncedSave = useRef(
    debounce(
      () => shoppingListStore.createOrUpdateItemInShoppingList(item),
      1000
    )
  ).current

  const onChangeQuantity = (item: Iitem, increment: boolean) => {
    shoppingListStore.changeQuantity(item, increment)
    debouncedSave()
  }

  const onSetQuantity = (item: Iitem, value: string) => {
    shoppingListStore.setQuantity(item, parseInt(value))
    debouncedSave()
  }

  return (
    <HStack pl={[1, 5]}>
      <NumberInput
        onChange={(valueString) => {
          onSetQuantity(item, valueString)
        }}
        value={item.quantity.toString() || 0}
        min={0}
        max={999}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper
            onClick={() => onChangeQuantity(item, true)}
          />
          <NumberDecrementStepper
            onClick={() => onChangeQuantity(item, false)}
          />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  )
})

import { VStack } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../stores/store'
import { Item } from './Item'

interface Props {}

export const ShoppingListItems: React.FC<Props> = observer(() => {
  const { settingStore, shoppingListStore } = useStore()

  return (
    <React.Fragment>
      <VStack>
        {shoppingListStore.shoppingList.items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </VStack>
    </React.Fragment>
  )
})

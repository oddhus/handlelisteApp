import React from 'react'
import { Button } from '@chakra-ui/react'

import { useStore } from '../../stores/store'
import { AddIcon } from '@chakra-ui/icons'

interface Props {}

export const AddItem: React.FC<Props> = () => {
  const { shoppingListStore, settingStore } = useStore()

  return (
    <Button
      aria-label={settingStore.language.add}
      onClick={() => shoppingListStore.insertEmptyItem()}
      icon={<AddIcon />}
      colorScheme="green"
    >
      {settingStore.language.addItem}
    </Button>
  )
}

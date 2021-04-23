import React from 'react'
import { Button } from '@chakra-ui/react'

import { useStore } from '../../stores/store'
import { AddIcon } from '@chakra-ui/icons'

interface Props {}

export const AddItem: React.FC<Props> = () => {
  const { shoppingListStore, settingStore } = useStore()

  return (
    <Button
      data-cy="add-item"
      aria-label={settingStore.language.add}
      onClick={() => shoppingListStore.insertEmptyItem()}
      leftIcon={<AddIcon />}
      colorScheme="brand"
    >
      {settingStore.language.addItem}
    </Button>
  )
}

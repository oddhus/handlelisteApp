import React, { Fragment, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Heading, Center, Button } from '@chakra-ui/react'

import { Iitem } from '../../models/ShoppingList'
import { useStore } from '../../stores/store'
import { AddItem } from '../shoppingList/AddItem'

interface Props {
  items: Iitem[]
  edit: Boolean
  onChangeQuantity: Function
  deleteItem: Function
  onChecked: Function
}

export const MyKitchenItems: React.FC<Props> = observer(
  ({ items, edit, deleteItem, onChangeQuantity, onChecked }) => {
    const { modalStore, myKitchenStore } = useStore()

    return (
      <Fragment>
        <Center>
          <Heading style={{ marginBottom: '10px' }}>My kitchen</Heading>
        </Center>

        {/* <ListComponent
                onChecked={onChecked}
                deleteItem={deleteItem}
                onChangeQuantity={onChangeQuantity}
                edit={edit}
                items={items}/> */}
        <Center>
          <Button
            size="lg"
            colorScheme="green"
            onClick={() => {
              modalStore.openModal(<AddItem />)
            }}
          >
            Add item
          </Button>
        </Center>
      </Fragment>
    )
  }
)

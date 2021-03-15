import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { FormControl, FormLabel, Switch, Container } from '@chakra-ui/react'
import { ListComponent } from '../components/shoppingList/ListComponent'
import { AddItem } from '../components/shoppingList/AddItem'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

interface Props {}

interface useParam {
  listId: string | undefined
}

export const ShoppingList: React.FC<Props> = observer(() => {
  const makingNewList = useLocation().pathname.includes('new-shopping-list')
  const paramObj: useParam = useParams()
  const { shoppingListStore, settingStore } = useStore()

  useEffect(() => {
    shoppingListStore.isNew = makingNewList
  }, [])

  useEffect(() => {
    if (paramObj?.listId) {
      const listId = parseInt(paramObj.listId)
      if (
        !makingNewList &&
        shoppingListStore.shoppingList.shoppingListID !== listId
      ) {
        shoppingListStore.getShoppinglist(listId)
      }
    }
  }, [makingNewList, paramObj])

  return (
    <Container maxW="container.xl">
      <FormControl display="flex" alignItems="center" mb={5}>
        <FormLabel htmlFor="email-alerts" mb="0">
          {shoppingListStore.isNew
            ? settingStore.language.saveList
            : settingStore.language.editList}
        </FormLabel>
        <Switch
          colorScheme="teal"
          id="editList"
          isChecked={shoppingListStore.isNew}
          onChange={(e) => {
            if (shoppingListStore.isNew) {
              shoppingListStore.isNew = e.target.checked
              shoppingListStore.handleSaveList()
            }
            shoppingListStore.isNew = e.target.checked
          }}
        />
      </FormControl>
      <ListComponent
        items={shoppingListStore.shoppingList?.items || []}
        edit={shoppingListStore.isNew}
        onChangeQuantity={shoppingListStore.changeQuantity}
        deleteItem={shoppingListStore.onDeleteItem}
        onChecked={shoppingListStore.onChecked}
      />
      {shoppingListStore.isNew ? (
        <AddItem onAdd={shoppingListStore.addItem} />
      ) : null}
    </Container>
  )
})

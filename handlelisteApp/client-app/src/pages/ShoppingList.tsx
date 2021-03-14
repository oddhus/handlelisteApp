import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { FormControl, FormLabel, Switch, Container } from '@chakra-ui/react'
import { ListComponent } from '../components/shoppingList/ListComponent'
import { AddItem } from '../components/shoppingList/AddItem'
import { Iitem } from '../models/ShoppingList'
import { useStore } from '../stores/store'

interface Props {}

interface useParam {
  listId: string | undefined
}

var shoppingList: Iitem[] = []

export const ShoppingList: React.FC<Props> = () => {
  let makingNewList = useLocation().pathname.includes('new-shopping-list')
  let paramObj: useParam = useParams()
  let listId = 0

  const { shoppingListStore, settingStore } = useStore()

  if (paramObj.listId !== undefined) {
    listId = parseInt(paramObj.listId)
    if (
      shoppingListStore.shoppingList !== null &&
      shoppingListStore.shoppingList.shoppingListID == listId
    )
      shoppingList = shoppingListStore.shoppingList?.items
    else {
      shoppingListStore.getShoppinglist(listId)
      if (shoppingListStore.shoppingList !== null)
        shoppingList = shoppingListStore.shoppingList?.items
    }
  }

  const [data, setData] = useState(shoppingList)
  const [edit, setEdit] = useState(makingNewList)
  const [isNew, setIsNew] = useState(makingNewList)

  const onAdd = (item: Iitem) => {
    setData([...data, item])
  }

  const handleSaveList = () => {
    if (isNew) {
      shoppingListStore.addShoppinglist(data)
      setIsNew(false)
    } else {
      shoppingListStore.saveShoppinglist(data, listId)
    }
  }

  const onDecrement = (item: Iitem) => {
    let newData = data
    let itemToChange = item
    if (item.quantity > 1) {
      let index = newData.indexOf(item)
      newData.forEach((foundItem) => {
        if (foundItem === item) {
          itemToChange.quantity = foundItem.quantity - 1
        }
      })
      newData[index] = itemToChange
      setData([...newData])
    }
  }

  const onIncrement = (item: Iitem) => {
    let newData = data
    let itemToChange = item
    let index = data.indexOf(item)
    data.forEach((foundItem) => {
      if (foundItem === item) {
        itemToChange.quantity = foundItem.quantity + 1
      }
    })
    newData[index] = itemToChange
    setData([...newData])
  }

  const onDeleteItem = (item: Iitem) => {
    let newData = data.filter((foundItem) => foundItem !== item)
    setData([...newData])
  }

  const onChecked = (item: Iitem) => {
    let index = data.findIndex((items) => items == item)
    item.hasBeenBought = !item.hasBeenBought
    data[index] = item
    setData([...data])
    console.log(data)
  }

  return (
    <Container maxW="container.xl">
      <FormControl display="flex" alignItems="center" mb={5}>
        <FormLabel htmlFor="email-alerts" mb="0">
          {edit
            ? settingStore.language.saveList
            : settingStore.language.editList}
        </FormLabel>
        <Switch
          colorScheme="teal"
          id="editList"
          isChecked={edit}
          onChange={(e) => {
            if (edit === true) {
              setEdit(e.target.checked)
              handleSaveList()
            }
            setEdit(e.target.checked)
          }}
        />
      </FormControl>
      <ListComponent
        items={data}
        edit={edit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        deleteItem={onDeleteItem}
        onChecked={onChecked}
      />
      {edit ? <AddItem onAdd={onAdd} /> : null}
    </Container>
  )
}

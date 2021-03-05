import React, { useState } from 'react';
import { Language } from '../lang/ActiveLanguage';
import { useLocation, useParams } from "react-router-dom";
import { 
  FormControl, 
  FormLabel, 
  Switch, 
  Container 
} from '@chakra-ui/react';
import { ListComponent } from '../components/shoppingList/shoppingList';
import { AddItem } from '../components/shoppingList/AddItem';
import { Iitem } from '../models/ShoppingList';
import { useStore } from "../stores/store";

interface Props {}

interface useParam {
  listId: string | undefined
}

var item: Iitem = {
  category: 'meieri',
  product: 'egg',
  quantity: 1,
  unit: 'stk',
}

var item1: Iitem = {
  category: 'Fryse',
  product: 'laks',
  quantity: 3,
  unit: 'stk',
}

var item2: Iitem = {
  category: 'Baking',
  product: 'mjøl',
  quantity: 2,
  unit: 'kg',
}

var item3: Iitem = {
  category: 'meieri',
  product: 'melk',
  quantity: 3,
  unit: 'liter',
}

var dummyData: Iitem[] = [item, item1, item2, item3]

export const ShoppingList: React.FC<Props> = () => {
  let makingNewList = useLocation().pathname.includes("new-shopping-list")
  let paramObj : useParam = useParams();
  
  const { shoppingListStore } = useStore()

  if(paramObj.listId !== undefined){
    shoppingListStore.getShoppinglist(parseInt(paramObj.listId))
  }

  const [data, setData] = useState(dummyData)
  const [edit, setEdit] = useState(makingNewList)
  const [isNew, setIsNew] = useState(makingNewList)

  const onAdd = (item: Iitem) => {
    dummyData.push(item)
    setData([...dummyData])
  }

  const handleSaveList = () => {
    if(isNew){
      console.log("Adding new Shoppinglist")
      // shoppingListStore.addShoppinglist(data)
      setIsNew(false)
    }
    else{
      console.log("Savining shopping list changes")
    }

  }


  const onDecrement = (item: Iitem) => {
    let newData = data
    let itemToChange = item
    if (item.quantity > 1) {
      let index = newData.indexOf(item)
      newData.find((foundItem) => {
        if (foundItem == item) {
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
    data.find((foundItem) => {
      if (foundItem == item) {
        itemToChange.quantity = foundItem.quantity + 1
      }
    })
    newData[index] = itemToChange
    setData([...newData])
  }

  const onDeleteItem = (item: Iitem) => {
    let newData = data.filter((foundItem) => foundItem != item)
    console.log(newData)
    setData([...newData])
    console.log(data)
  }

  return (
    <Container maxW='container.xl'>
      <FormControl display='flex' alignItems='center' mb={5}>
        <FormLabel htmlFor='email-alerts' mb='0'>
          {Language.editList()}
        </FormLabel>
        <Switch
          colorScheme='teal'
          id='editList'
          isChecked={edit}
          onChange={(e) => {
            if(edit === true){
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
      />
      {edit ? <AddItem onAdd={onAdd} /> : null}
    </Container>
  )
}

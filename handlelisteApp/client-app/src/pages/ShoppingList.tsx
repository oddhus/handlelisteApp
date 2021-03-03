import React, { ChangeEvent, useState } from 'react';
import { Language } from '../lang/ActiveLanguage';
import { 
  FormControl, 
  FormLabel, 
  Switch, 
  Container 
} from '@chakra-ui/react';
import { ListComponent } from '../components/shoppingList/shoppingList';
import { AddItem } from '../components/shoppingList/AddItem';
import { Iitem } from '../models/ShoppingList';

interface Props {}

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
  const [data, setData] = useState(dummyData)
  const [edit, setEdit] = useState(false)

  const onAdd = (item: Iitem) => {
    dummyData.push(item)
    setData([...dummyData])
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
          onChange={(e) => setEdit(e.target.checked)}
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

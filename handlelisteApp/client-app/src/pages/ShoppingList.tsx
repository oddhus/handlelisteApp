import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Switch,
  Container,
  Button,
} from '@chakra-ui/react'
import { ListComponent } from '../components/shoppingList/ListComponent'
import { AddItem } from '../components/shoppingList/AddItem'
import { store, useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'
import { Toast } from '../components/shared/Toast'

interface Props {}

interface useParam {
  listId: string | undefined
}

export const ShoppingList: React.FC<Props> = observer(() => {
  const makingNewList = useLocation().pathname.includes('new-shopping-list')
  const history = useHistory()
  const paramObj: useParam = useParams()
  const { shoppingListStore, settingStore } = useStore()
  const [edit, setEdit] = useState(makingNewList)

  useEffect(() => {
    shoppingListStore.isNew = makingNewList
    shoppingListStore.resetFeedBack()
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

  const handleEndShoppingTrip = async () => {
    await shoppingListStore.saveShoppinglist().then(() => {
      if (shoppingListStore.feedBack.status === 200) {
        setTimeout(function () {
          shoppingListStore.resetFeedBack()
          history.go(-1)
        }, 100)
      }
    })
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
            if (edit) {
              shoppingListStore.handleSaveList()
              setEdit(e.target.checked)
            }
            setEdit(e.target.checked)
          }}
        />
      </FormControl>
      <ListComponent
        items={shoppingListStore.shoppingList?.items || []}
        edit={edit}
        onChangeQuantity={shoppingListStore.changeQuantity}
        deleteItem={shoppingListStore.onDeleteItem}
        onChecked={shoppingListStore.onChecked}
      />
      {edit ? (
        <AddItem onAdd={shoppingListStore.addItem} />
      ) : (
        <Button
          size="lg"
          colorScheme="teal"
          ml={'25vw'}
          mt={'5vh'}
          onClick={() => handleEndShoppingTrip()}
        >
          {settingStore.language.endShoppingTrip}
        </Button>
      )}

      {shoppingListStore.feedBack !== null && (
        <Toast
          text={
            shoppingListStore.feedBack.status !== 200
              ? settingStore.language.somethingError
              : settingStore.language.shoppingListSaved
          }
          store={shoppingListStore}
          status={shoppingListStore.feedBack.type}
        />
      )}
    </Container>
  )
})

import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Switch,
  Container,
  VStack,
} from '@chakra-ui/react'
import { AddItem } from '../components/shoppingList/AddItem'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'
import { Toast } from '../components/shared/Toast'
import { ShoppingListItems } from '../components/shoppingList/ShoppingListItems'

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
        }, 200)
      }
    })
  }

  return (
    <Container maxW="container.md">
      <VStack>
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
        <AddItem />
        <ShoppingListItems />
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
      </VStack>
    </Container>
  )
})

import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Switch,
  ButtonGroup,
  Button,
  Heading,
  Container,
  VStack,
} from '@chakra-ui/react'
import { AddItem } from '../components/shoppingList/AddItem'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'
import { Toast } from '../components/shared/Toast'
import { ShoppingListItems } from '../components/shoppingList/ShoppingListItems'
import {Recipes} from "./Recipes";

interface Props {}

interface useParam {
  listId: string | undefined
}

export const ShoppingList: React.FC<Props> = observer(() => {
  const makingNewList = useLocation().pathname.includes('new-shopping-list')
  const history = useHistory()
  const paramObj: useParam = useParams()
  const { shoppingListStore, settingStore, modalStore } = useStore()
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
        <Heading 
            as="h1" 
            size="xl" 
            isTruncated
            style={{marginBottom: '20px'}}
        >
          amazing demo list
        </Heading>
        <ButtonGroup 
          style={{marginBottom: '20px'}}
          spacing="4"
          size="md">
          <AddItem />
          <Button
              colorScheme="teal" 
              variant="outline"
              onClick={() => modalStore.openModal(<Recipes/>)}
          >Add items from recipe</Button>
        </ButtonGroup>
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

import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/store'
import { Toast } from '../components/shared/Toast'
import {
  Button,
  Table,
  Tbody,
  Td,
  Tr,
  Thead,
  Th,
  Container,
  IconButton,
  Center,
  Spinner,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { IShoppingList } from '../models/ShoppingList'
import { DeleteIcon } from '@chakra-ui/icons'

interface Props {}

export const ShoppingLists: React.FC<Props> = observer(() => {
  const history = useHistory()
  const { shoppingListStore, settingStore } = useStore()
  const toast = useToast()

  useEffect(() => {
    shoppingListStore.resetFeedBack()
    shoppingListStore.fetchShoppingLists()
  }, [])

  const onDeleteShoppingList = (shoppingList: IShoppingList) => {
    shoppingListStore.deleteShoppingList(shoppingList)
  }

  if (shoppingListStore.shoppingLists == undefined) {
    shoppingListStore.shoppingLists = []
  }

  return (
    <Container maxW="container.md">
      {shoppingListStore.isLoading ? (
        <Center color="black">
          <Stack>
            <Spinner
              thickness="4px"
              speed="1.0s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Stack>
        </Center>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th fontSize={'xl'} paddingLeft={'2.5rem'} textAlign={['left']}>
                {settingStore.language.myShoppingLists}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {shoppingListStore.shoppingLists.map((shoppingList) => {
              return (
                <Tr key={shoppingList.shoppingListID}>
                  <Td>
                    <IconButton
                      colorScheme="red"
                      aria-label="Call Segun"
                      size="md"
                      className="edit"
                      onClick={() => onDeleteShoppingList(shoppingList)}
                      icon={<DeleteIcon />}
                    />
                  </Td>
                  <Td>
                    <Button
                      fontSize={'lg'}
                      colorScheme="teal"
                      variant="link"
                      onClick={() => {
                        shoppingListStore.setCurrentShoppingList(shoppingList)
                        history.push(
                          'shopping-list/' + shoppingList.shoppingListID
                        )
                      }}
                    >
                      {shoppingList.updatedOn}
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      )}
      <Button
        size="lg"
        colorScheme="teal"
        ml={'11vw'}
        mt={'5vh'}
        onClick={() => history.push('shopping-list/new-shopping-list')}
      >
        {settingStore.language.newShoppingList}
      </Button>

      {shoppingListStore.feedBack !== null && (
        <Toast
          text={
            shoppingListStore.feedBack.status !== 200
              ? settingStore.language.somethingError
              : settingStore.language.shoppingListDeleted
          }
          store={shoppingListStore}
          status={shoppingListStore.feedBack.type}
        />
      )}
    </Container>
  )
})

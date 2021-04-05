import React, { Fragment, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/store'
import { Toast } from '../components/shared/Toast'
import {
  Button,
  Text,
  Container,
  IconButton,
  Center,
  Spinner,
  Stack,
  Heading,
  VStack,
  Grid,
  GridItem,
  Divider,
  useMediaQuery,
} from '@chakra-ui/react'
import { IShoppingList } from '../models/ShoppingList'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { AddItemsFromLastTrip } from '../components/shoppingList/AddItemsFromLastTrip'

interface Props {}

let firstRender = true

export const ShoppingLists: React.FC<Props> = observer(() => {
  const history = useHistory()
  const { shoppingListStore, settingStore, modalStore } = useStore()

  const willMount = useRef(true)

  const [isLargerThan450] = useMediaQuery('(min-width: 450px)')

  if (willMount.current) {
    shoppingListStore.resetFeedBack()
    willMount.current = false
  }

  useEffect(() => {
    firstRender = false
    shoppingListStore.fetchShoppingLists()
  }, [])

  const onDeleteShoppingList = (shoppingList: IShoppingList) => {
    shoppingListStore.deleteShoppingList(shoppingList)
  }

  if (shoppingListStore.shoppingLists == undefined) {
    shoppingListStore.shoppingLists = []
  }

  const onClickNewShoppingList = () => {
    shoppingListStore.resetShoppingList()
    shoppingListStore.resetFeedBack()
    shoppingListStore.addShoppinglist()
    if (
      shoppingListStore.shoppingLists.length > 0 &&
      shoppingListStore.shoppingLists[
        shoppingListStore.shoppingLists.length - 1
      ].items.length > 0
    ) {
      modalStore.openModal(<AddItemsFromLastTrip />)
    }
  }

  if (shoppingListStore.isLoading) {
    return <Container maxW="container.md"></Container>
  }

  return (
    <Container maxW="container.md">
      <VStack spacing={6}>
        <Center mt="2vh">
          <Heading size="lg">{settingStore.language.myShoppingLists}</Heading>
        </Center>
        <Center>
          <Button
            colorScheme="green"
            leftIcon={<AddIcon />}
            onClick={() => {
              onClickNewShoppingList()
            }}
          >
            {settingStore.language.newShoppingList}
          </Button>
        </Center>
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
        ) : shoppingListStore.shoppingLists.length === 0 ? (
          <Center>
            <Text>No shopping lists</Text>
          </Center>
        ) : (
          <VStack justify="flex-start " spacing={3} minW="100%">
            {shoppingListStore.shoppingLists.map((shoppingList) => (
              <Fragment key={shoppingList.shoppingListID}>
                <Grid
                  minW="100%"
                  alignItems="center"
                  templateColumns="repeat(12, 1fr)"
                  gap={4}
                >
                  <GridItem
                    colSpan={10}
                    onClick={() => {
                      shoppingListStore.setCurrentShoppingList(shoppingList)
                      history.push(
                        'shopping-list/' + shoppingList.shoppingListID
                      )
                    }}
                  >
                    <Text
                      fontSize={isLargerThan450 ? 'lg' : 'md'}
                      color="teal.600"
                      isTruncated
                      fontWeight="700"
                    >
                      {shoppingList.name}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2} alignItems="flex-end">
                    <IconButton
                      colorScheme="red"
                      aria-label="Call Segun"
                      size="md"
                      className="edit"
                      onClick={() => onDeleteShoppingList(shoppingList)}
                      icon={<DeleteIcon />}
                    />
                  </GridItem>
                </Grid>
                <Divider />
              </Fragment>
            ))}
          </VStack>
        )}
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
      </VStack>
    </Container>
  )
})

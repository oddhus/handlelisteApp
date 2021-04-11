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
  Flex,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from '@chakra-ui/react'
import { IShoppingList } from '../models/ShoppingList'
import { AddIcon, ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { AddItemsFromLastTrip } from '../components/shoppingList/AddItemsFromLastTrip'

interface Props {}

export const ShoppingLists: React.FC<Props> = observer(() => {
  const history = useHistory()
  const { shoppingListStore, settingStore, modalStore } = useStore()
  const [isLargerThan450] = useMediaQuery('(min-width: 450px)')

  useEffect(() => {
    shoppingListStore.fetchShoppingLists()
  }, [])

  const onDeleteShoppingList = (shoppingList: IShoppingList) => {
    shoppingListStore.deleteShoppingList(shoppingList)
  }

  const onClickNewShoppingList = (addPrevious: boolean) => {
    shoppingListStore.resetShoppingList()
    shoppingListStore.resetFeedBack()
    shoppingListStore.addShoppinglist()
    if (
      shoppingListStore.shoppingLists.length > 0 &&
      shoppingListStore.shoppingLists[
        shoppingListStore.shoppingLists.length - 1
      ].items.length > 0 &&
      addPrevious
    ) {
      modalStore.openModal(<AddItemsFromLastTrip />)
    }
  }

  if (shoppingListStore.isLoading) {
    return <Container maxW="container.md"></Container>
  }

  return (
    <Container maxW="container.sm">
      <VStack spacing={6}>
        <Center mt="1vh">
          <Heading size="lg">{settingStore.language.myShoppingLists}</Heading>
        </Center>
        <Center>
          <ButtonGroup isAttached>
            <Button
              colorScheme="green"
              leftIcon={<AddIcon />}
              onClick={() => {
                onClickNewShoppingList(false)
              }}
            >
              {settingStore.language.newShoppingList}
            </Button>
            <Menu>
              <MenuButton
                backgroundColor="green.100"
                _hover={{ backgroundColor: 'green.200' }}
                _active={{ backgroundColor: 'green.300' }}
                border="1px"
                borderColor="green.500"
                as={IconButton}
                icon={<ChevronDownIcon />}
              ></MenuButton>
              <MenuList>
                <MenuItem onClick={() => onClickNewShoppingList(true)}>
                  {settingStore.language.addItemsFromLastTripOption}
                </MenuItem>
              </MenuList>
            </Menu>
          </ButtonGroup>
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
            <Text>{settingStore.language.noShoppingListFound}</Text>
          </Center>
        ) : (
          <VStack justify="flex-start" minW="100%">
            {shoppingListStore.shoppingLists.map((shoppingList) => (
              <Fragment key={shoppingList.shoppingListID}>
                <Grid
                  minW="100%"
                  alignItems="center"
                  templateColumns="repeat(12, 1fr)"
                  gap={4}
                  px={[0, 1]}
                  py={[1, 2]}
                  _hover={{
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 18px 43px',
                    cursor: 'pointer',
                  }}
                >
                  <GridItem
                    colSpan={10}
                    onClick={() => {
                      shoppingListStore.setCurrentShoppingList(shoppingList)
                      history.push(
                        'shopping-list/' + shoppingList.shoppingListID
                      )
                    }}
                    cursor="pointer"
                    minH="100%"
                    display="flex"
                    alignItems="center"
                  >
                    <Text
                      fontSize={isLargerThan450 ? 'lg' : 'md'}
                      color="teal.600"
                      isTruncated
                      fontWeight="600"
                    >
                      {shoppingList.name}
                    </Text>
                  </GridItem>
                  <GridItem colSpan={2} minW="100%">
                    <Flex justify="flex-end">
                      <IconButton
                        colorScheme="red"
                        aria-label="Call Segun"
                        size="md"
                        className="edit"
                        onClick={() => onDeleteShoppingList(shoppingList)}
                        icon={<DeleteIcon />}
                      />
                    </Flex>
                  </GridItem>
                </Grid>
                <Divider />
              </Fragment>
            ))}
          </VStack>
        )}
        <Toast store={shoppingListStore} />
      </VStack>
    </Container>
  )
})

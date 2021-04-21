import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/store'
import { Toast } from '../components/shared/Toast'
import { DateTime } from 'luxon'
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
} from '@chakra-ui/react'
import { IShoppingList } from '../models/ShoppingList'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'

interface Props {}

export const ShoppingLists: React.FC<Props> = observer(() => {
  const history = useHistory()
  const { shoppingListStore, settingStore } = useStore()
  const [isLargerThan450] = useMediaQuery('(min-width: 450px)')

  useEffect(() => {
    shoppingListStore.fetchShoppingLists()
  }, [])

  const onDeleteShoppingList = (shoppingList: IShoppingList) => {
    shoppingListStore.deleteShoppingList(shoppingList)
  }

  const onClickNewShoppingList = () => {
    shoppingListStore.resetShoppingList()
    shoppingListStore.resetFeedBack()
    shoppingListStore.addShoppinglist()
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
              colorScheme="brand"
              leftIcon={<AddIcon />}
              onClick={() => {
                onClickNewShoppingList()
              }}
            >
              {settingStore.language.newShoppingList}
            </Button>
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
                    display="flex"
                    alignItems="center"
                  >
                    <VStack spacing={0} justify="flex-start">
                      <Text
                        fontSize={isLargerThan450 ? 'lg' : 'md'}
                        color="teal.600"
                        isTruncated
                        fontWeight="600"
                        minW="100%"
                      >
                        {shoppingList.name}
                      </Text>
                      <Text fontSize="xs" minW="100%">
                        {DateTime.fromISO(shoppingList.updatedOn).toRelative({
                          locale: settingStore.languageString,
                        })}
                      </Text>
                    </VStack>
                  </GridItem>
                  <GridItem colSpan={2} minW="100%">
                    <Flex justify="flex-end">
                      <IconButton
                        colorScheme="red"
                        variant="ghost"
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

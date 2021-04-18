import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/store'
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Center,
  Switch,
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  GridItem,
  Grid,
  useDisclosure,
} from '@chakra-ui/react'
import { MyRecipes } from '../components/recipes/MyRecipes'
import { AllRecipes } from '../components/recipes/AllRecipes'
import { useHistory } from 'react-router-dom'
import { SuggestedRecipes } from '../components/recipes/SuggestedRecipes'
import { Toast } from '../components/shared/Toast'
import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import { stringify } from 'query-string'
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { AdvancedSearchDrawer } from '../components/recipes/AdvancedSearchDrawer'

interface Props {}

export const Recipes: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore, userStore, shoppingListStore } = useStore()
  const history = useHistory()

  const [query, setQuery] = useQueryParams({
    searchText: StringParam,
    pageNumber: NumberParam,
    pageSize: NumberParam,
    items: withDefault(ArrayParam, []),
  })

  const { pageNumber, pageSize, items, searchText } = query

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      recipeStore.tabIndex = 1
    }
  }, [])

  const backToShoppingList = () => {
    history.push(`shopping-list/${shoppingListStore.backToMyShoppingList}`)
    shoppingListStore.backToMyShoppingList = null
  }

  useEffect(() => {
    if (recipeStore.tabIndex === 0 && userStore.user?.userID) {
      recipeStore.getUserRecipes(
        parseInt(userStore.user.userID),
        searchText,
        items
      )
    } else if (recipeStore.tabIndex === 1) {
      recipeStore.getAllRecipes(stringify(query))
    } else if (recipeStore.tabIndex === 2) {
      recipeStore.getRecipieSuggestions(searchText, items)
    }
  }, [recipeStore.tabIndex])

  useEffect(() => {
    recipeStore.searchInRecipes(
      recipeStore.tabIndex === 1 ? stringify(query) : searchText,
      items
    )
  }, [query])

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, searchText: e.target.value.toLowerCase() })
  }

  return (
    <Container maxW="container.md">
      <AdvancedSearchDrawer isOpen={isOpen} onClose={onClose} />
      <Toast store={shoppingListStore} />
      <Toast store={recipeStore} />
      {shoppingListStore.backToMyShoppingList && (
        <Center>
          <Button
            onClick={() => backToShoppingList()}
            size="lg"
            colorScheme="teal"
            variant="outline"
            style={{ marginBottom: '20px' }}
          >
            Back to my shopping list
          </Button>
        </Center>
      )}

      <Tabs
        isFitted
        variant="enclosed"
        index={recipeStore.tabIndex}
        onChange={(index) => recipeStore.setTabIndex(index)}
      >
        <TabList>
          <Tab isDisabled={!userStore.isLoggedIn}>
            {settingStore.language.myRecipes}
          </Tab>
          <Tab>{settingStore.language.allRecipes}</Tab>
          {userStore.isLoggedIn ? (
            <Tab>{settingStore.language.recommendations}</Tab>
          ) : null}
        </TabList>
        <VStack minW="100%">
          <Grid
            gap={2}
            mt="3vh"
            templateColumns="repeat(12, 1fr)"
            templateRows={['repeat(2, 1fr)', 'repeat(1, 1fr)']}
          >
            <GridItem colSpan={[12, 6, 8]}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Search2Icon color="gray.300" />}
                />
                <Input
                  value={searchText || ''}
                  onChange={(e) => onInput(e)}
                  type="tel"
                  placeholder={settingStore.language.search}
                />
                {((items && items.length > 0) || searchText) && (
                  <InputRightElement width="2.5rem">
                    <IconButton
                      aria-label="reset"
                      h="1.75rem"
                      size="sm"
                      icon={<CloseIcon />}
                      onClick={() =>
                        setQuery({ searchText: undefined, items: undefined })
                      }
                    />
                  </InputRightElement>
                )}
              </InputGroup>
            </GridItem>
            <GridItem
              colSpan={[5, 4, 2]}
              rowStart={[2, 1, 1]}
              colStart={[1, 7, 9]}
            >
              <Button
                onClick={() => onOpen()}
                colorScheme="brand"
                variant={items && items.length > 0 ? 'solid' : 'outline'}
              >
                Advanced Search
              </Button>
            </GridItem>
            <GridItem colSpan={[2, 1]} rowStart={[2, 1, 1]} colStart={[10, 12]}>
              <FormControl display="flex" alignItems="center" width={'20%'}>
                <Switch
                  onChange={() => {
                    recipeStore.cardView = !recipeStore.cardView
                  }}
                />
                <FormLabel
                  htmlFor="email-alerts"
                  mb="0"
                  fontSize="sm"
                  style={{ marginLeft: '10px' }}
                >
                  List view
                </FormLabel>
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>

        <TabPanels>
          <TabPanel pl={[0, 5]} pr={[0, 5]}>
            <MyRecipes />
          </TabPanel>
          <TabPanel pl={[0, 5]} pr={[0, 5]}>
            <AllRecipes />
          </TabPanel>
          <TabPanel pl={[0, 5]} pr={[0, 5]}>
            <SuggestedRecipes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
})

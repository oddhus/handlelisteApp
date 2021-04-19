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
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { MyRecipes } from '../components/recipes/MyRecipes'
import { AllRecipes } from '../components/recipes/AllRecipes'
import { useHistory } from 'react-router-dom'
import { SuggestedRecipes } from '../components/recipes/SuggestedRecipes'
import { Toast } from '../components/shared/Toast'
import { stringify } from 'query-string'
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { AdvancedSearchDrawer } from '../components/recipes/AdvancedSearchDrawer'
import { Pagination } from '../components/shared/Pagination'
import { SearchBar } from '../components/recipes/SearchBar'

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
          { userStore.isLoggedIn && <Tab isDisabled={!userStore.isLoggedIn}>
            <Text fontSize="sm">{settingStore.language.myRecipes}</Text>
          </Tab>}
          <Tab><Text fontSize="sm">{settingStore.language.allRecipes}</Text></Tab>
          {userStore.isLoggedIn ? (
              <Tab> <Text fontSize="sm">{settingStore.language.recommendations}</Text></Tab>
          ) : null}
        </TabList>
        <SearchBar onOpen={onOpen} />

        <TabPanels>
          <TabPanel pl={[0, 5]} pr={[0, 5]}>
            <MyRecipes />
          </TabPanel>
          <TabPanel pl={[0, 5]} pr={[0, 5]}>
            <AllRecipes />
            <Center pt={4}>
              <Pagination paginatedRecipe={recipeStore.allRecipes} />
            </Center>
          </TabPanel>
          <TabPanel pl={[0, 5]} pr={[0, 5]}>
            <SuggestedRecipes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
})

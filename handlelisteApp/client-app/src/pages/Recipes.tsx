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
  useToast,
  Button,
  Center,
} from '@chakra-ui/react'
import { MyRecipes } from '../components/recipes/MyRecipes'
import { AllRecipes } from '../components/recipes/AllRecipes'
import { useHistory } from 'react-router-dom'
import { RecipeSearch } from '../components/recipes/RecipeSearch'
import { SuggestedRecipes } from '../components/recipes/SuggestedRecipes'
import { Toast } from '../components/shared/Toast'

interface Props {}

export const Recipes: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore, userStore, shoppingListStore } = useStore()

  const toast = useToast()
  const history = useHistory()

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      recipeStore.tabIndex = 1
    }
  }, [])

  useEffect(() => {
    if (recipeStore.tabIndex === 1 || recipeStore.tabIndex === 3) {
      recipeStore.getAllRecipes()
    } else if (recipeStore.tabIndex === 0 && userStore.user?.userID) {
      recipeStore.getUserRecipes(parseInt(userStore.user.userID))
    } else if (recipeStore.tabIndex === 2) {
      recipeStore.getRecipieSuggestions()
    }
  }, [recipeStore.tabIndex, userStore.user])

  const backToShoppingList = () => {
    history.push(`shopping-list/${shoppingListStore.backToMyShoppingList}`)
    shoppingListStore.backToMyShoppingList = null
  }

  return (
    <Container maxW="container.md">
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
          {userStore.isLoggedIn ? (
            <Tab>{settingStore.language.search}</Tab>
          ) : null}
        </TabList>
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
          <TabPanel pl={[0, 5]} pr={[0, 5]}>
            <RecipeSearch />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
})

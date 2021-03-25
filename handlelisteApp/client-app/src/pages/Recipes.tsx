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
import {useHistory} from "react-router-dom";

interface Props {}

export const Recipes: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore, userStore, shoppingListStore } = useStore()

  const toast = useToast()
  const history = useHistory()
  useEffect(() => {
    if (recipeStore.errorToastMessage || recipeStore.successToastMessage) {
      toast({
        title: !!recipeStore.errorToastMessage ? 'Failed' : 'Success',
        description: !!recipeStore.errorToastMessage
          ? recipeStore.errorToastMessage
          : recipeStore.successToastMessage,
        status: !!recipeStore.errorToastMessage ? 'error' : 'success',
        duration: 4000,
        isClosable: true,
      })
    }
  }, [recipeStore.errorToastMessage, recipeStore.successToastMessage, toast])

  useEffect(() => {
    recipeStore.reset()
    if (!userStore.isLoggedIn) {
      recipeStore.tabIndex = 1
    }
  }, [])

  useEffect(() => {
    if (recipeStore.tabIndex === 1) {
      recipeStore.getAllRecipes()
    } else if (recipeStore.tabIndex === 0 && userStore.user?.userID) {
      recipeStore.getUserRecipes(parseInt(userStore.user.userID))
    }
  }, [recipeStore.tabIndex, userStore.user])

  const backToShoppingList = () => {
    history.push(`shopping-list/${shoppingListStore.backToMyShoppingList}`)
    shoppingListStore.backToMyShoppingList = null
  }

  return (
    <Container maxW="container.md">
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
        </TabList>
        <TabPanels>
          <TabPanel>
            <MyRecipes />
          </TabPanel>
          <TabPanel>
            <AllRecipes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
})

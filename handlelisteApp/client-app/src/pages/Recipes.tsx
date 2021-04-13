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
  Switch,
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
} from '@chakra-ui/react'
import { MyRecipes } from '../components/recipes/MyRecipes'
import { AllRecipes } from '../components/recipes/AllRecipes'
import { useHistory } from 'react-router-dom'
import { SuggestedRecipes } from '../components/recipes/SuggestedRecipes'
import { Toast } from '../components/shared/Toast'
import { Search2Icon } from '@chakra-ui/icons'

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

        <HStack marginTop="3vh" spacing={5}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              onChange={(e) =>
                recipeStore.searchInRecipies(e.target.value.toLowerCase())
              }
              type="tel"
              placeholder={settingStore.language.search}
            />
          </InputGroup>

          <FormControl display="flex" alignItems="center" width={'20%'}>
            <Switch
              onChange={() => {
                recipeStore.cardView = !recipeStore.cardView
              }}
            />
            <FormLabel
              htmlFor="email-alerts"
              mb="0"
              style={{ marginLeft: '10px' }}
            >
              List view
            </FormLabel>
          </FormControl>
        </HStack>

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

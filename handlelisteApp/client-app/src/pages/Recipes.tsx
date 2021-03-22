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
} from '@chakra-ui/react'
import { MyRecipes } from '../components/recipes/MyRecipes'
import { AllRecipes } from '../components/recipes/AllRecipes'

interface Props {}

export const Recipes: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore, userStore } = useStore()

  const toast = useToast()

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
  }, [])

  useEffect(() => {
    if (recipeStore.tabIndex === 1) {
      recipeStore.getAllRecipes()
    } else if (userStore.user?.userID && recipeStore.tabIndex === 0) {
      recipeStore.getUserRecipes(parseInt(userStore.user.userID))
    }
  }, [recipeStore.tabIndex])

  return (
    <Container maxW="container.md">
      <Tabs
        isFitted
        variant="enclosed"
        index={userStore.isLoggedIn ? recipeStore.tabIndex : 1}
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

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
} from '@chakra-ui/react'
import { MyRecipes } from '../components/recipes/MyRecipes'
import { AllRecipes } from '../components/recipes/AllRecipes'
import { IRecipe } from '../models/recipe'

interface Props {}

const DUMMY_DATA = [
  {
    recipeID: 1,
    recipeName: 'Hamburger',
    shortDescription: 'Smaker godt',
    approach: 'Stek den på grillen',
  },
  {
    recipeID: 2,
    recipeName: 'Ostesmørbrød',
    shortDescription: 'Smaker godt',
    approach: 'Stek det på grillen',
  },
  {
    recipeID: 3,
    recipeName: 'Pølse i brød',
    shortDescription: 'Smaker godt',
    approach: 'Stek pølsen på grillen',
  },
] as IRecipe[]

export const Recipes: React.FC<Props> = observer(() => {
  const { settingStore, recipeStore } = useStore()

  useEffect(() => {
    recipeStore.allRecipes = DUMMY_DATA
    recipeStore.currentRecipeList = DUMMY_DATA
  }, [])

  return (
    <Container maxW="container.md">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>{settingStore.language.myRecipes}</Tab>
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

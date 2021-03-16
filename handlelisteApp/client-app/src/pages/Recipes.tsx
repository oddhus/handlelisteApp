import React from 'react'
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

interface Props {}

export const Recipes: React.FC<Props> = observer(() => {
  const { settingStore } = useStore()

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

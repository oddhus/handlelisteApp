import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  SimpleGrid,
  useMediaQuery,
  VStack,
  Text,
  Center,
  Divider,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useHistory } from 'react-router'
import { useStore } from '../../stores/store'
import { RecipeList } from './RecipeList'

interface Props {}

export const MyRecipes: React.FC<Props> = observer(() => {
  const { recipeStore, settingStore } = useStore()
  const history = useHistory()
  const [isLargerThan650] = useMediaQuery('(min-width: 650px)')

  return (
    <>
      {isLargerThan650 && !recipeStore.cardView ? (
        <SimpleGrid columns={2} spacing={5}>
          <Box>
            <Center>
              <Text fontWeight="700">{`${settingStore.language.myRecipes} (${recipeStore.filteredUserRecipeList.length})`}</Text>{' '}
            </Center>
            <Divider pb={2} />
            <Box pt={2}>
              <RecipeList recipes={recipeStore.filteredUserRecipeList} />
            </Box>
          </Box>
          <Box>
            <Center>
              <Text fontWeight="700">{`Favorites (${recipeStore.filteredSavedRecipeList.length})`}</Text>
            </Center>
            <Divider pb={2} />
            <Box pt={2}>
              <RecipeList recipes={recipeStore.filteredSavedRecipeList} />
            </Box>
          </Box>
        </SimpleGrid>
      ) : (
        <Accordion defaultIndex={[0]} allowMultiple minW="100%">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontWeight="700">{`My recipes (${recipeStore.filteredUserRecipeList.length})`}</Text>{' '}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <VStack minW="100%">
                <RecipeList recipes={recipeStore.filteredUserRecipeList} />
                {!recipeStore.loading &&
                  recipeStore.userRecipeList.length === 0 && (
                    <Button
                      data-cy="create-recipe-btn"
                      onClick={() => history.push('/create-recipe')}
                    >
                      {settingStore.language.createRecipe}
                    </Button>
                  )}
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontWeight="700">{`Favorites (${recipeStore.filteredSavedRecipeList.length})`}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} px={0}>
              <RecipeList recipes={recipeStore.filteredSavedRecipeList} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  )
})

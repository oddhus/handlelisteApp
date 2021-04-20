import {
  Text,
  Grid,
  GridItem,
  Box,
  Img,
  Heading,
  HStack,
  VStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useHistory } from 'react-router'
import { IRecipe } from '../../models/recipe'
import { RecipeActionButtons } from './RecipeActionButtons'
import { RecipeFavoriteButton } from './RecipeFavoriteButton'

interface Props {
  recipe: IRecipe
  addable: boolean
  editable: boolean
  deleteable: boolean
}

export const RecipeListItem: React.FC<Props> = observer(
  ({ recipe, editable, deleteable }) => {
    const history = useHistory()
    return (
      <LinkBox
        _hover={{
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 18px 43px',
          cursor: 'pointer',
        }}
        data-cy="recipe-list-item"
      >
        <Grid
          templateColumns="repeat(18, 1fr)"
          gap={2}
          overflow="hidden"
          rounded="md"
          boxShadow="md"
        >
          <GridItem colSpan={[6, 4]} alignItems="center">
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              minW="100%"
            >
              <Img
                src={
                  recipe.imgUrl
                    ? recipe.imgUrl
                    : 'https://rbox.in/img/recipes-default.png'
                }
                alt={recipe.recipeName}
                objectFit="cover"
                overflow="hidden"
                height="100px"
                width="100%"
              />
            </Box>
          </GridItem>

          <GridItem maxH="100%" colSpan={[12, 14]} pr={2}>
            <Grid templateColumns="repeat(12, 1fr)" maxH="100%">
              <GridItem colSpan={10}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  minW="100%"
                >
                  <VStack spacing={2}>
                    <Box minW="100%" maxW="100%">
                      <HStack spacing={2} pt={1}>
                        <LinkOverlay
                          onClick={() =>
                            history.push(`recipe/${recipe.recipeID}`)
                          }
                        >
                          <Heading size="md">{recipe.recipeName}</Heading>
                        </LinkOverlay>
                        <RecipeFavoriteButton recipe={recipe} />
                      </HStack>
                    </Box>
                    <Box minW="100%" minH="100%">
                      <Text noOfLines={2}>{recipe.shortDescription}</Text>
                    </Box>
                  </VStack>
                </Box>
              </GridItem>
              <GridItem colSpan={2} rowSpan={2}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  minW="100%"
                  minH="100%"
                  pt={3}
                >
                  <RecipeActionButtons
                    recipe={recipe}
                    addable
                    editable={editable}
                    deleteable={deleteable}
                    iconSize="sm"
                    vertical
                    collapse
                  />
                </Box>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </LinkBox>
    )
  }
)

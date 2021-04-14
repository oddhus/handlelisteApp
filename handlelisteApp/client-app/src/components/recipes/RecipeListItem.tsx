import { StarIcon } from '@chakra-ui/icons'
import {
  Text,
  Grid,
  GridItem,
  Box,
  Img,
  Heading,
  HStack,
  VStack,
  IconButton,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { IRecipe } from '../../models/recipe'
import { RecipeActionButtons } from './RecipeActionButtons'

interface Props {
  recipe: IRecipe
  addable: boolean
  editable: boolean
  deleteable: boolean
}

export const RecipeListItem: React.FC<Props> = observer(
  ({ recipe, editable, deleteable }) => {
    const history = useHistory()
    const [liked, setLiked] = useState(false)
    return (
      <Grid
        templateColumns="repeat(18, 1fr)"
        gap={2}
        maxH="100%"
        rounded="md"
        boxShadow="lg"
        _hover={{
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 18px 43px',
          cursor: 'pointer',
        }}
      >
        <GridItem colSpan={6} alignItems="center">
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
              onClick={() => history.push(`recipe/${recipe.recipeID}`)}
            />
          </Box>
        </GridItem>

        <GridItem maxH="100%" colSpan={[12]} pr={2}>
          <Grid templateColumns="repeat(12, 1fr)" maxH="100%">
            <GridItem colSpan={10}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                minW="100%"
              >
                <VStack spacing={0}>
                  <Box minW="100%" maxW="100%">
                    <HStack spacing={2} pt={1}>
                      <Heading
                        size="md"
                        onClick={() =>
                          history.push(`recipe/${recipe.recipeID}`)
                        }
                      >
                        {recipe.recipeName}
                      </Heading>
                      <IconButton
                        backgroundColor="white"
                        aria-label="save recipe"
                        onClick={() => setLiked(!liked)}
                        icon={
                          <StarIcon color={liked ? 'yellow.500' : 'grey.500'} />
                        }
                      />
                    </HStack>
                  </Box>
                  <Box
                    minW="100%"
                    minH="100%"
                    onClick={() => history.push(`recipe/${recipe.recipeID}`)}
                  >
                    <Text noOfLines={2}>{recipe.shortDescription}</Text>
                  </Box>
                </VStack>
              </Box>
            </GridItem>
            <GridItem colSpan={2} rowSpan={2}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                minW="100%"
                py={2}
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
    )
  }
)

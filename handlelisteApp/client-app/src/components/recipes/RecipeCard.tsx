import React from 'react'

import {
  Text,
  Box,
  Flex,
  Image,
  VStack,
  HStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { IRecipe } from '../../models/recipe'
import { useHistory } from 'react-router-dom'
import { RecipeActionButtons } from './RecipeActionButtons'
import { RecipeFavoriteButton } from './RecipeFavoriteButton'

interface Props {
  recipe: IRecipe
  addable?: boolean
  editable?: boolean
  deleteable?: boolean
}

const RecipeCard: React.FC<Props> = ({
  recipe,
  addable,
  editable,
  deleteable,
}) => {
  const history = useHistory()

  return (
    <LinkBox
      _hover={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 18px 43px',
        cursor: 'pointer',
      }}
      overflow="hidden"
      data-cy="recipe-card"
      borderRadius="lg"
      boxShadow="md"
    >
      <Image
        src={
          recipe.imgUrl
            ? recipe.imgUrl
            : 'https://rbox.in/img/recipes-default.png'
        }
        alt={recipe.recipeName}
        objectFit="cover"
        overflow="hidden"
        height="150px"
        width="100%"
      />
      <Box px={4} pb={4} pt={2}>
        <VStack spacing={4}>
          <Box minW="100%" maxW="100%">
            <HStack justify="space-between" maxW="100%">
              <LinkOverlay
                maxW="80%"
                onClick={() => {
                  history.push(`/recipes/${recipe.recipeID}`)
                }}
              >
                <Box
                  data-cy="recipe-card-title"
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  isTruncated
                >
                  {recipe.recipeName}
                </Box>
              </LinkOverlay>
              <RecipeFavoriteButton recipe={recipe} side="left" />
            </HStack>
            <Box minW="100%">
              <Text fontSize="sm" isTruncated maxW="100%">
                {recipe.shortDescription}
              </Text>
            </Box>
          </Box>
          <Flex justify="flex-end" minW="100%">
            <RecipeActionButtons
              recipe={recipe}
              editable={editable}
              addable
              deleteable={deleteable}
              iconSize="sm"
            />
          </Flex>
        </VStack>
      </Box>
    </LinkBox>
  )
}

export default RecipeCard

import React from 'react'

import { Text, Box, Flex, Image, Tag, VStack } from '@chakra-ui/react'
import { IRecipe } from '../../models/recipe'
import { useHistory } from 'react-router-dom'
import { RecipeActionButtons } from './RecipeActionButtons'

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
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
      <Box p={4}>
        <VStack spacing={3}>
          <Box
            minW="100%"
            maxW="100%"
            onClick={() => {
              history.push(`/recipes/${recipe.recipeID}`)
            }}
            _hover={{ cursor: 'pointer', color: 'teal.500' }}
          >
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {recipe.recipeName}
            </Box>
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
    </Box>
  )
}

export default RecipeCard

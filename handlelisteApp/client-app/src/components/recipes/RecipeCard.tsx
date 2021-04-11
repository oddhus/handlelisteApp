import React from 'react';

import {Badge, Box, Image, Tag} from "@chakra-ui/react"
import {IRecipe} from "../../models/recipe";
import {useHistory} from "react-router-dom";

interface Props {
    recipe: IRecipe
}

const RecipeCard: React.FC<Props> = ({recipe}) => {
    const history = useHistory()

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => {
            history.push(`/recipes/${recipe.recipeID}`)
        }}>
            <Image src={recipe.imgUrl ? recipe.imgUrl : 'https://rbox.in/img/recipes-default.png'}
                   alt={recipe.recipeName}/>
            <Box p="6">
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    {recipe.recipeName}
                </Box>
            </Box>
        </Box>
    );
}

export default RecipeCard;
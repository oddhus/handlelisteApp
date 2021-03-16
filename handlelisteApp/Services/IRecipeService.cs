﻿using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Services
{
    public interface IRecipeService
    {
        IEnumerable<RecipeDTO> GetAllRecipes();
        RecipeDTO GetRecipeById(int id);
        RecipeDTO AddRecipe(RecipeDTO recipe);
        IEnumerable<RecipeDTO> GetRecipesMatchingBasedOnItemsInMyKitchen(MyKitchen kitchen);
        IEnumerable<RecipeDTO> GetRecipesUsingItem(Item item);
        RecipeDTO UpdateRecipe(int id, RecipeDTO recipe);
        bool DeleteRecipe(int id);
    }
}

using handlelisteApp.Models;
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

        RecipeDTO AddRecipe(RecipeDTO recipe, int userId);

        IEnumerable<RecipeDTO> GetRecipesMatchingBasedOnItemsInMyKitchen(MyKitchen kitchen);
        List<RecipeDTO> GetRecipeMatchesBasedOnUsersShoppingLists(int userId);

        IEnumerable<RecipeDTO> GetRecipesUsingItem(Item item);

        List<RecipeDTO> GetAllByUserIdRecipes(int userId);

        RecipeDTO UpdateRecipe(int recipeId, int userId, RecipeDTO recipe);

        List<RecipeDTO> GetSavedRecipes(int userId);

        SavedRecipeDTO SaveRecipe(int recipeId, int userId);

        bool DeleteRecipe(int id);

        bool DeleteSavedRecipe(int userId, int recipeId);
    }
}
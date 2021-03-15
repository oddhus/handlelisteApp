using handlelisteApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Services
{
    public interface IRecipeService
    {
        IEnumerable<Recipe> GetAllRecipes();
        Recipe GetRecipeById(int id);
        Recipe AddRecipe(Recipe recipe);
        IEnumerable<Recipe> GetRecipesMatchingBasedOnItemsInMyKitchen(MyKitchen kitchen);
        IEnumerable<Recipe> GetRecipesUsingItem(Item item);
    }
}

using handlelisteApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Data
{
    public interface IRecipeRepository
    {
        Recipe GetRecipeById(int id);

        Recipe AddRecipe(Recipe newRecipe);

        IEnumerable<Recipe> GetAllRecipes();

        IEnumerable<Recipe> GetAllRecipesUsingItem(Item item);

        IEnumerable<Recipe> GetAllRecipesUsingSeveralItems(List<Item> items);

        IEnumerable<Recipe> GetAllUserRecipes(int id);

        void DeleteRecipe(Recipe recipe);

        Recipe UpdateRecipe(int id, Recipe recipe);
    }
}
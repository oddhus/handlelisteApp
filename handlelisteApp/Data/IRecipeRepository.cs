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
        public IEnumerable<Recipe> GetAllRecipes();
        public IEnumerable<Recipe> GetAllRecipesUsingItem(Item item);
    }
}

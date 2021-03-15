using handlelisteApp.Data;
using handlelisteApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Services
{
    public class RecipeService : IRecipeService
    {

        private readonly IRecipeRepository _repository;

        public RecipeService(IRecipeRepository repository)
        {
            _repository = repository;
        }

        public Recipe AddRecipe(Recipe recipe)
        {
            return _repository.AddRecipe(recipe);
        }

        public IEnumerable<Recipe> GetAllRecipes()
        {
            return _repository.GetAllRecipes();
        }

        public Recipe GetRecipeById(int id)
        {
            return _repository.GetRecipeById(id);
        }



        public IEnumerable<Recipe> GetRecipesMatchingBasedOnItemsInMyKitchen(MyKitchen kitchen)
        {
            List<Recipe> matches = new List<Recipe>();
            
            foreach(ItemInMyKitchen item in kitchen.ItemsInMyKitchen)
            {
                IEnumerable<Recipe> matchForItem = _repository.GetAllRecipesUsingItem(item.Item);
                matches.AddRange(matchForItem);
            }

            return matches;


        }

        public IEnumerable<Recipe> GetRecipesUsingItem(Item item)
        {
            return _repository.GetAllRecipesUsingItem(item);
        }
    }
}

using handlelisteApp.Context;
using handlelisteApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Data
{
    public class RecipeRepository : IRecipeRepository
    {

        private readonly ShoppingListContext _context;



        public RecipeRepository(ShoppingListContext context)
        {
            this._context = context;
        }

        public Recipe AddRecipe(Recipe newRecipe)
        {
            _context.Add(newRecipe);
            _context.SaveChanges();
            return newRecipe;
        }

        public IEnumerable<Recipe> GetAllRecipes()
        {
            return _context.Recipes.ToList();
        }

        public IEnumerable<Recipe> GetAllRecipesUsingItem(Item item)
        {
            List<Recipe> itemsInRecipes = _context.Recipes.

                Where(r => r.Items.Any(i => i.Item.ItemID == item.ItemID)).
                ToList();


                /*
                SelectMany(r => r.Items).
                Where(iir => iir.Item == item).
                Select(iir => iir.Recipe).
                ToList();
            */
            
            //.Where(iir => iir.Any(i => i.Item.Equals(item))).Join(a, b => a.RecipeID, b => b.RecipeID, (a, c) => new { c });
            return itemsInRecipes;
//            return _context.Recipes.Select(r => r.Items).Where(iimk => iimk.It)
        }



        public Recipe GetRecipeById(int id)
        {
            return _context.Recipes.Find(id);
        }
    }
}

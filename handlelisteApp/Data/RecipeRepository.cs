using handlelisteApp.Context;
using handlelisteApp.Models;
using Microsoft.EntityFrameworkCore;
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

        public void DeleteRecipe(Recipe recipe)
        {
            _context.Recipes.Remove(recipe);
            _context.SaveChanges();
        }

        public IEnumerable<Recipe> GetAllRecipes()
        {
            return _context.Recipes.Include(r => r.Items).ThenInclude(iir => iir.Item).ToList();
        }

        public IEnumerable<Recipe> GetAllUserRecipes(int userID)
        {
            return _context.Recipes.Where(r => r.UserID == userID).Include(r => r.Items).ToList();
        }

        public IEnumerable<Recipe> GetAllRecipesUsingItem(Item item)
        {
            List<Recipe> itemsInRecipes = _context.Recipes.

                Where(r => r.Items.Any(i => i.Item.ItemID == item.ItemID)).Include(r => r.Items).
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

        public IEnumerable<Recipe> GetAllRecipesUsingSeveralItems(List<Item> items)
        {
            List<Recipe> recipesWithItems = _context.Recipes.Where(r => r.Items.Any(iir => items.Contains(iir.Item))).Include(r => r.Items).ToList();
            return recipesWithItems;
        }

        public Recipe GetRecipeById(int id)
        {
            return _context.Recipes.Include(r => r.Items).ThenInclude(r => r.Item).Where(r => r.RecipeID == id).FirstOrDefault();
        }

        public Recipe UpdateRecipe(int id, Recipe recipe)
        {
            if (recipe == null)
            {
                throw new ArgumentNullException(nameof(recipe));
            }

            _context.Recipes.Update(recipe);
            _context.SaveChanges();
            return recipe;
        }
    }
}
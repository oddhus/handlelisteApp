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
            return _context.Recipes
                .Include(r => r.Items)
                    .ThenInclude(iir => iir.Item)
                .Include(r => r.UserSaved)
                .AsSplitQuery()
                .ToList();
        }

        public IEnumerable<Recipe> GetAllUserRecipes(int userID)
        {
            return _context.Recipes
                .Where(r => r.UserID == userID)
                .Include(r => r.Items)
                    .ThenInclude(iir => iir.Item)
                .Include(r => r.UserSaved)
                .AsSplitQuery()
                .ToList();
        }

        public IEnumerable<Recipe> GetAllRecipesUsingItem(Item item)
        {
            return _context.Recipes
                .Where(r => r.Items.Any(i => i.Item.ItemID == item.ItemID))
                .Include(r => r.Items)
                    .ThenInclude(iir => iir.Item)
                .Include(r => r.UserSaved)
                .AsSplitQuery()
                .ToList();
        }

        public IEnumerable<Recipe> GetAllRecipesUsingSeveralItems(List<Item> items)
        {
            List<Recipe> recipesWithItems = _context.Recipes.Where(r => r.Items.Any(iir => items.Contains(iir.Item))).Include(r => r.Items).ThenInclude(iir => iir.Item).ToList();
            return recipesWithItems;
        }

        public Recipe GetRecipeById(int id)
        {
            return _context.Recipes
                .Where(r => r.RecipeID == id)
                .Include(r => r.Items)
                    .ThenInclude(r => r.Item)
                .Include(r => r.UserSaved)
                .AsSplitQuery()
                .FirstOrDefault();
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

        public IEnumerable<Recipe> GetSavedRecipes(int userId)
        {
            return _context.Recipes
                .Where(r => _context.SavedRecipes.Any(sr =>
                        sr.UserId == userId && r.RecipeID == sr.RecipeId))
                .Include(r => r.Items)
                    .ThenInclude(iir => iir.Item)
                .Include(r => r.UserSaved)
                .AsSplitQuery()
                .ToList();
        }

        public SavedRecipe SaveRecipe(SavedRecipe savedRecipe)
        {
            _context.SavedRecipes.Add(savedRecipe);
            _context.SaveChanges();
            return savedRecipe;
        }

        public SavedRecipe GetSavedRecipeByRecipeIdAndUserId(int userId, int recipeId)
        {
            return _context.SavedRecipes.Where(r => r.RecipeId == recipeId && r.UserId == userId).FirstOrDefault();
        }


        public void DeleteSavedRecipe(SavedRecipe savedRecipe)
        {
            _context.SavedRecipes.Remove(savedRecipe);
            _context.SaveChanges();
        }
    }
}
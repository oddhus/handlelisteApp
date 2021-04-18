using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace handlelisteApp.Models.DTO
{
    public class PaginatedRecipeList
    {
        public int CurrentPage { get; private set; }
        public int TotalPages { get; private set; }
        public int PageSize { get; private set; }
        public int TotalCount { get; private set; }
        public bool HasPrevious => CurrentPage > 1;
        public bool HasNext => CurrentPage < TotalPages;

        public IEnumerable<Recipe> recipes;

        public PaginatedRecipeList()
        {
        }

        public PaginatedRecipeList(List<Recipe> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            recipes = items;
        }

        public static PaginatedRecipeList ToPagedList(IQueryable<Recipe> source, RecipeParameters recipeParameters)
        {
            var result = source
                .Where(r => string.IsNullOrWhiteSpace(recipeParameters.SearchText) ||
                        r.RecipeName.ToLower().Contains(recipeParameters.SearchText) ||
                        r.ShortDescription.ToLower().Contains(recipeParameters.SearchText) ||
                        r.Approach.ToLower().Contains(recipeParameters.SearchText))
                .Include(r => r.Items)
                    .ThenInclude(iir => iir.Item)
                .Include(r => r.UserSaved)
                .OrderBy(r => r.RecipeID)
                .AsSplitQuery().AsEnumerable();
            if ((recipeParameters.Items != null && recipeParameters.Items.Count > 0))
            {
                result = result.Where(r =>
                    recipeParameters.Items.All(rp => r.Items.Any(i => i.Item.ItemName.ToLower() == rp.ToLower())));
            }
            var count = result.Count();
            var recipes = result
                .Skip((recipeParameters.PageNumber - 1) * recipeParameters.PageSize)
                .Take(recipeParameters.PageSize)
                .ToList();
            return new PaginatedRecipeList(recipes, count, recipeParameters.PageNumber, recipeParameters.PageSize);
        }
    }
}
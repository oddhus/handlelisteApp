using AutoMapper;
using handlelisteApp.Data;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _repository;
        private readonly IItemRepository _itemRepository;
        private readonly IShoppingListRepository _shoppingListRepository;
        private readonly IMapper _mapper;

        public RecipeService(IRecipeRepository repository, IItemRepository itemRepository, IShoppingListRepository shoppingListRepository, IMapper mapper)
        {
            _repository = repository;
            _itemRepository = itemRepository;
            _mapper = mapper;
            _shoppingListRepository = shoppingListRepository;
        }

        public RecipeDTO AddRecipe(RecipeDTO recipe, int userId)
        {
            Recipe newRecipe = RecipeFromRecipeDTO(recipe, userId);

            return _mapper.Map<RecipeDTO>(_repository.AddRecipe(newRecipe), opt => opt.Items["UserId"] = userId);
        }

        private Recipe RecipeFromRecipeDTO(RecipeDTO recipe, int userId)
        {
            Recipe newRecipe = new Recipe
            {
                RecipeName = recipe.RecipeName,
                Approach = recipe.Approach,
                ShortDescription = recipe.ShortDescription,
                UserID = userId,
                ImgUrl = recipe.ImgUrl,
                Items = new List<ItemInRecipe>()
            };
            foreach (var item in recipe.Items)
            {
                var storedItem = _itemRepository.FindByItemName(item.ItemName);
                if (storedItem == null)
                {
                    storedItem = new Item() { ItemName = item.ItemName };
                    _itemRepository.AddItem(storedItem);
                }

                newRecipe.Items.Add(new ItemInRecipe()
                {
                    ItemID = storedItem.ItemID,
                    Item = storedItem,
                    Quantity = item.Quantity,
                    Recipe = newRecipe,
                    Unit = item.Unit
                });
            }

            return newRecipe;
        }

        public bool DeleteRecipe(int id)
        {
            Recipe recipe = _repository.GetRecipeById(id);
            if (recipe == null) { return false; }
            _repository.DeleteRecipe(recipe);
            return true;
        }

        public IEnumerable<RecipeDTO> GetAllRecipes(int userId)
        {
            return _mapper.Map<List<RecipeDTO>>(_repository.GetAllRecipes(), opt => opt.Items["UserId"] = userId);
        }

        public List<RecipeDTO> GetAllByUserIdRecipes(int userId)
        {
            return _mapper.Map<List<RecipeDTO>>(_repository.GetAllUserRecipes(userId), opt => opt.Items["UserId"] = userId);
        }

        public RecipeDTO GetRecipeById(int recipeId, int userId)
        {
            Recipe recipe = _repository.GetRecipeById(recipeId);
            if (recipe == null)
            {
                return null;
            }
            //return convertRecipeToRecipeDTO(recipe);
            return _mapper.Map<RecipeDTO>(recipe, opt => opt.Items["UserId"] = userId);
        }

        public List<RecipeDTO> GetRecipeMatchesBasedOnUsersShoppingLists(int userId)
        {
            IEnumerable<ShoppingList> shoppingListsFromLastThreeWeeks = _shoppingListRepository.FindShoppingListsFromTheLastThreeWeeksByUserId(userId);
            IEnumerable<Item> ListOfAllItemsBought = shoppingListsFromLastThreeWeeks
                .SelectMany(i => i.Items)
                .Where(iis => iis.HasBeenBought)
                .Select(iis => iis.Item)
                .ToList();

            List<Recipe> matches = new List<Recipe>();

            foreach (Item item in ListOfAllItemsBought)
            {
                IEnumerable<Recipe> matchForItem = _repository.GetAllRecipesUsingItem(item);
                matches.AddRange(matchForItem);
            }

            matches = matches.Distinct().ToList();

            return _mapper.Map<List<RecipeDTO>>(matches, opt => opt.Items["UserId"] = userId);
        }

        public IEnumerable<RecipeDTO> GetRecipesUsingItem(Item item)
        {
            return _mapper.Map<List<RecipeDTO>>(_repository.GetAllRecipesUsingItem(item));
        }

        public RecipeDTO UpdateRecipe(int recipeId, int userId, RecipeDTO recipe)
        {
            Recipe storedRecipe = _repository.GetRecipeById(recipeId);
            if (storedRecipe == null)
            {
                return null;
            }

            if (storedRecipe.UserID != userId) //Some user other than the recipe's creator is trying to change it
            {
                return null;
            }

            storedRecipe.RecipeName = recipe.RecipeName;
            storedRecipe.Approach = recipe.Approach;
            storedRecipe.ShortDescription = recipe.ShortDescription;
            storedRecipe.ImgUrl = recipe.ImgUrl;
            storedRecipe.Items = new List<ItemInRecipe>();

            foreach (var item in recipe.Items)
            {
                var storedItem = _itemRepository.FindByItemName(item.ItemName);
                if (storedItem == null)
                {
                    storedItem = new Item() { ItemName = item.ItemName };
                    _itemRepository.AddItem(storedItem);
                }

                storedRecipe.Items.Add(new ItemInRecipe()
                {
                    ItemID = storedItem.ItemID,
                    Item = storedItem,
                    Quantity = item.Quantity,
                    Recipe = storedRecipe,
                    Unit = item.Unit
                });
            }

            storedRecipe = _repository.UpdateRecipe(recipeId, storedRecipe);

            return _mapper.Map<RecipeDTO>(storedRecipe, opt => opt.Items["UserId"] = userId);
        }

        public List<RecipeDTO> GetSavedRecipes(int userId)
        {
            return _mapper.Map<List<RecipeDTO>>(_repository.GetSavedRecipes(userId), opt => opt.Items["UserId"] = userId);

        }

        public SavedRecipeDTO SaveRecipe(int userId, int recipeId)
        {
            List<RecipeDTO> recipes = GetSavedRecipes(userId);
            if (recipes.Any(r => r.RecipeID == recipeId))
            {
                return _mapper.Map<SavedRecipeDTO>(_repository.GetSavedRecipeByRecipeIdAndUserId(userId, recipeId));
            }

            SavedRecipe savedRecipe = new SavedRecipe
            {
                UserId = userId,
                RecipeId = recipeId,
                likedOn = DateTime.Now
            };

            return _mapper.Map<SavedRecipeDTO>(_repository.SaveRecipe(savedRecipe));
        }

        public bool DeleteSavedRecipe(int userId, int recipeId)
        {
            SavedRecipe savedRecipe = _repository.GetSavedRecipeByRecipeIdAndUserId(userId, recipeId);
            if (savedRecipe == null) { return false; }
            _repository.DeleteSavedRecipe(savedRecipe);
            return true;
        }
    }
}
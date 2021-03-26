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
        private readonly IMapper _mapper;

        public RecipeService(IRecipeRepository repository, IItemRepository itemRepository, IMapper mapper)
        {
            _repository = repository;
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public RecipeDTO AddRecipe(RecipeDTO recipe, int userId)
        {
            Recipe newRecipe = RecipeFromRecipeDTO(recipe, userId);

            return _mapper.Map<RecipeDTO>(_repository.AddRecipe(newRecipe));

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

        public IEnumerable<RecipeDTO> GetAllRecipes()
        {
            IEnumerable<Recipe> recipes = _repository.GetAllRecipes();
            //Can't get mapper to include items -> manual mapping
            List<RecipeDTO> recipeDTOs = new List<RecipeDTO>();
            foreach (Recipe recipe in recipes)
            {
                recipeDTOs.Add(convertRecipeToRecipeDTO(recipe));
            }

            return _mapper.Map<List<RecipeDTO>>(_repository.GetAllRecipes());
        }

        public List<RecipeDTO> GetAllByUserIdRecipes(int userId)
        {
            return _mapper.Map<List<RecipeDTO>>(_repository.GetAllUserRecipes(userId));
        }

        private List<RecipeDTO> convertRecipeListToRecipeDTOList(List<Recipe> recipes)
        {
            List<RecipeDTO> recipeDTOs = new List<RecipeDTO>();
            foreach (Recipe recipe in recipes)
            {
                recipeDTOs.Add(convertRecipeToRecipeDTO(recipe));
            }
            return recipeDTOs;
        }

        private RecipeDTO convertRecipeToRecipeDTO(Recipe recipe)
        {
            RecipeDTO recipeDTO = new RecipeDTO() { RecipeID = recipe.RecipeID, RecipeName = recipe.RecipeName, Approach = recipe.Approach, ShortDescription = recipe.ShortDescription, ImgUrl = recipe.ImgUrl, Items = new List<ItemInRecipeDTO>() };
            foreach (ItemInRecipe itemInRecipe in recipe.Items)
            {
                recipeDTO.Items.Add(new ItemInRecipeDTO() { ItemName = itemInRecipe.Item.ItemName, Quantity = itemInRecipe.Quantity, Unit = itemInRecipe.Unit });
            }
            return recipeDTO;
        }

        public RecipeDTO GetRecipeById(int id)
        {
            Recipe recipe = _repository.GetRecipeById(id);
            return convertRecipeToRecipeDTO(recipe);
        }

        public IEnumerable<RecipeDTO> GetRecipesMatchingBasedOnItemsInMyKitchen(MyKitchen kitchen)
        {
            List<Item> ItemsInMyKitchen = kitchen.ItemsInMyKitchen.Select(i => i.Item).ToList();

            List<Recipe> matches = new List<Recipe>();

            foreach (ItemInMyKitchen item in kitchen.ItemsInMyKitchen)
            {
                IEnumerable<Recipe> matchForItem = _repository.GetAllRecipesUsingItem(item.Item);
                matches.AddRange(matchForItem);
            }

            return _mapper.Map<List<RecipeDTO>>(matches);
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

            return _mapper.Map<RecipeDTO>(storedRecipe);
        }
    }
}
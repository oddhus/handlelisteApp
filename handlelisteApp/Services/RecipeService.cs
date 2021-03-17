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
            Recipe newRecipe = new Recipe
            {
                RecipeName = recipe.RecipeName,
                Approach = recipe.Approach,
                ShortDescription = recipe.Approach,
                UserID = userId,
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
                    Quantiy = item.Quantity,
                    Recipe = newRecipe,
                    Unit = item.Unit
                });
            }

            return _mapper.Map<RecipeDTO>(_repository.AddRecipe(newRecipe));
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
            RecipeDTO recipeDTO = new RecipeDTO() { RecipeID = recipe.RecipeID, RecipeName = recipe.RecipeName, Approach = recipe.Approach, ShortDescription = recipe.ShortDescription, Items = new List<ItemInRecipeDTO>() };
            foreach (ItemInRecipe itemInRecipe in recipe.Items)
            {
                recipeDTO.Items.Add(new ItemInRecipeDTO() { ItemName = itemInRecipe.Item.ItemName, Quantity = itemInRecipe.Quantiy, Unit = itemInRecipe.Unit });
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

        public RecipeDTO UpdateRecipe(int id, RecipeDTO recipe)
        {
            Recipe storedRecipe = _repository.GetRecipeById(recipe.RecipeID);

            Recipe updatedRecipe = _repository.UpdateRecipe(id, storedRecipe);
            return _mapper.Map<RecipeDTO>(updatedRecipe);
        }
    }
}
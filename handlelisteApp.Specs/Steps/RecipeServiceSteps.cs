using AutoMapper;
using FluentAssertions;
using handlelisteApp.Data;
using handlelisteApp.Mappings.Profiles;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using Moq;
using System;
using System.Collections.Generic;
using TechTalk.SpecFlow;

namespace handlelisteApp.Specs.Steps
{
    [Binding]
    public class RecipeServiceSteps
    {
        private Mock<IRecipeRepository> _mockRecipeRepo;
        private Mock<IItemRepository> _mockItemRepo;
        private Mock<IShoppingListRepository> _mockShoppingListRepo;
        private RecipeService _service;
        private RecipeDTO recipeDTO;
        private Recipe savedRecipe;
        private Item item;

        private Item Eggs;
        private Item Milk;
        private Item Cheese;

        private Recipe EggRecipe;
        private Recipe EggRecipe2;
        private Recipe MilkRecipe;
        private Recipe MilkRecipe2;
        private Recipe CheeseRecipe;
        private Recipe MilkAndEggsRecipe;

        private ShoppingList FourWeeksAgoShoppingList;
        private ShoppingList TwoWeeksAgoShoppingList;
        private ShoppingList OneWeekAgoShoppingList;

        private User user;

        private readonly ScenarioContext _scenarioContext;

        public RecipeServiceSteps(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;

            //Configure mapper
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new RecipeProfile());
                mc.AddProfile(new ItemInRecipeProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();

            item = new Item()
            {
                ItemName = "brus",
                ItemID = 1,
            };

            Eggs = new Item() { ItemID = 2, ItemName = "Eggs" };
            Milk = new Item() { ItemID = 3, ItemName = "Milk" };

            Cheese = new Item() { ItemID = 4, ItemName = "Cheese" };


            EggRecipe = new Recipe
            {
                RecipeID = 0,
                RecipeName = "EggRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantity = 1 } },
                UserID = 1,
                UserSaved = new List<SavedRecipe>()
            };
            EggRecipe2 = new Recipe
            {
                RecipeID = 1,
                RecipeName = "EggRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantity = 2 } },
                UserID = 1,
                UserSaved = new List<SavedRecipe>()
            };

            MilkRecipe = new Recipe
            {
                RecipeID = 2,
                RecipeName = "MilkRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantity = 1 } },
                UserID = 1,
                UserSaved = new List<SavedRecipe>()
            };
            MilkRecipe2 = new Recipe
            {
                RecipeID = 3,
                RecipeName = "MilkRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantity = 2 } },
                UserID = 1,
                UserSaved = new List<SavedRecipe>()
            };
            CheeseRecipe = new Recipe
            {
                RecipeID = 4,
                RecipeName = "CheeseRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Cheese, Quantity = 2 } },
                UserID = 2,
                UserSaved = new List<SavedRecipe>()

            };
            MilkAndEggsRecipe = new Recipe
            {
                RecipeID = 4,
                RecipeName = "MilkAndEggsRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs }, new ItemInRecipe { Item = Milk } },
                UserID = 2,
                UserSaved = new List<SavedRecipe>()

            };

            user = new User()
            {
                UserID = 0

            };

            FourWeeksAgoShoppingList = new ShoppingList
            {
                ShoppingListID = 0,
                CreatedOn = DateTime.Now.AddDays(-28),
                UpdatedOn = DateTime.Now.AddDays(-27),
                UserId = 0,
                user = user,
                Items = new List<ItemOnShoppingList>() { new ItemOnShoppingList { Item = Cheese, HasBeenBought = true } }
            };
            TwoWeeksAgoShoppingList = new ShoppingList
            {
                ShoppingListID = 1,
                CreatedOn = DateTime.Now.AddDays(-20),
                UpdatedOn = DateTime.Now.AddDays(-19),
                UserId = 0,
                user = user,
                Items = new List<ItemOnShoppingList>() { new ItemOnShoppingList { Item = Eggs, HasBeenBought = true } }
            };
            OneWeekAgoShoppingList = new ShoppingList
            {
                ShoppingListID = 2,
                CreatedOn = DateTime.Now.AddDays(-7),
                UpdatedOn = DateTime.Now.AddDays(-6),
                UserId = 0,
                user = user,
                Items = new List<ItemOnShoppingList>() { new ItemOnShoppingList { Item = Milk, HasBeenBought = true }, new ItemOnShoppingList { Item = Cheese, HasBeenBought = false } }
            };

            List<ShoppingList> shoppingLists = new List<ShoppingList> { FourWeeksAgoShoppingList, TwoWeeksAgoShoppingList, OneWeekAgoShoppingList };
            user.ShoppingLists = shoppingLists;



            //Create input
            recipeDTO = new RecipeDTO()
            {
                RecipeID = 123,
                RecipeName = "Ostesmørbrød",
                ShortDescription = "Smaker godt",
                Approach = "Første steg...",
                Items = new List<ItemInRecipeDTO>(){
                    new ItemInRecipeDTO()
                    {
                        ItemName = "brus",
                        Quantity = 2,
                        Unit = "pcs"
                    }
                },
                HasLiked = false

            };

            savedRecipe = new Recipe()
            {
                RecipeID = 123,
                UserID = 1,
                RecipeName = "Ostesmørbrød",
                ShortDescription = "Smaker godt",
                Approach = "Første steg...",
                Items = new List<ItemInRecipe>(){
                    new ItemInRecipe()
                    {
                        Item = item,
                        Quantity = 2,
                        Unit = "pcs",
                        ItemID = 1,
                        RecipeID = 123,
                    }
                },
                UserSaved = new List<SavedRecipe>()
            };

            //Mock repos
            _mockRecipeRepo = new Mock<IRecipeRepository>();

            _mockItemRepo = new Mock<IItemRepository>();
            _mockShoppingListRepo = new Mock<IShoppingListRepository>();

            _mockItemRepo.Setup(i => i.FindByItemName(It.IsAny<string>())).Returns(item);

            _mockShoppingListRepo.Setup(i => i.FindShoppingListsFromTheLastThreeWeeksByUserId(user.UserID)).Returns(new List<ShoppingList>() { TwoWeeksAgoShoppingList, OneWeekAgoShoppingList });
            _mockRecipeRepo.Setup(i => i.GetAllRecipesUsingItem(Milk)).Returns(new List<Recipe> { MilkRecipe, MilkRecipe2, MilkAndEggsRecipe });
            _mockRecipeRepo.Setup(i => i.GetAllRecipesUsingItem(Eggs)).Returns(new List<Recipe> { EggRecipe, EggRecipe2, MilkAndEggsRecipe });
            _mockRecipeRepo.Setup(i => i.GetAllRecipesUsingItem(Cheese)).Returns(new List<Recipe> { CheeseRecipe });

            //Add mock repos to Service
            _service = new RecipeService(_mockRecipeRepo.Object, _mockItemRepo.Object, _mockShoppingListRepo.Object, mapper);
        }

        [Given(@"I provide an item to the ServiceController")]
        public void GivenIProvideAnItemToTheServiceController()
        {
            _scenarioContext.Pending();
        }

        [When(@"I get a result")]
        public void WhenIGetAResult()
        {
            _scenarioContext.Pending();
        }

        [Then(@"the result should contain recipes using that item and only those recipes")]
        public void ThenTheResultShouldContainRecipesUsingThatItemAndOnlyThoseRecipes()
        {
            _scenarioContext.Pending();
        }

        [Given(@"that userId is (.*)")]
        public void GivenThatUserIdIs(int userId)
        {
            //Setup
            _mockRecipeRepo.Setup(r => r.GetAllUserRecipes(userId)).Returns(new List<Recipe>() { savedRecipe });
            _mockItemRepo.Setup(i => i.FindByItemName(It.IsAny<string>())).Returns(item);

            var result = _service.GetAllByUserIdRecipes(userId);
            _scenarioContext.Add("SearchForRecipesByUserID", result);
        }

        [When(@"I get a result from GetRecipeByUserID")]
        public void WhenIGetAResultFromGetRecipeByUserID()
        {
        }

        [Then(@"the result should contain recipes with (.*)")]
        public void ThenTheResultShouldContainRecipesWith(int userId)
        {
            var result = _scenarioContext.Get<List<RecipeDTO>>("SearchForRecipesByUserID");
            result.Should().BeOfType<List<RecipeDTO>>().And.Contain(r => r.RecipeName == "Ostesmørbrød");
        }




        [Given(@"I have updated a shopping list in the last three weeks")]
        public void GivenIHaveUpdatedAShoppingListInTheLastThreeWeeks()
        {


        }

        [When(@"I ask for suggestions")]
        public void WhenIAskForSuggestions()
        {
            var result = _service.GetRecipeMatchesBasedOnUsersShoppingLists(user.UserID);
            _scenarioContext.Add("SearchResultBasedOnShoppingLists", result);
        }

        [Then(@"the result should contain recipes using items on those shopping lists")]
        public void ThenTheResultShouldContainRecipesUsingItemsOnThoseShoppingLists()
        {
            List<RecipeDTO> result = _scenarioContext.Get<List<RecipeDTO>>("SearchResultBasedOnShoppingLists");
            result.Should()
                .Contain(r => r.RecipeName == "EggRecipe")
                .And
                .Contain(r => r.RecipeName == "EggRecipe2")
                .And
                .Contain(r => r.RecipeName == "MilkRecipe")
                .And
                .Contain(r => r.RecipeName == "MilkRecipe2");
        }
        [Then(@"the result should not contain recipes using items not on those shopping lists")]
        public void ThenTheResultShouldNotContainRecipesUsingItemsNotOnThoseShoppingLists()
        {
            List<RecipeDTO> result = _scenarioContext.Get<List<RecipeDTO>>("SearchResultBasedOnShoppingLists");
            result.Should().NotContain(r => r.RecipeName == "CheeseRecipe");
        }




    }
}
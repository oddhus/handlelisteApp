using FluentAssertions;
using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;

namespace handlelisteApp.Specs.Features
{
    [Binding]
    public class RecipeRepositorySteps
    {
        private readonly ScenarioContext _scenarioContext;

        private Mock<DbSet<Recipe>> _mockSet;
        private Mock<ShoppingListContext> _mockContext;
        private RecipeRepository _repository;

        private Item Eggs;
        private Item Milk;
        private Item Cheese;

        private Recipe EggRecipe;
        private Recipe EggRecipe2;
        private Recipe MilkRecipe;
        private Recipe MilkRecipe2;
        private Recipe CheeseRecipe;
        private Recipe MilkAndEggsRecipe;

        private MyKitchen kitchen;

        public RecipeRepositorySteps(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;

            Eggs = new Item { ItemName = "Eggs", ItemID = 1 };
            Milk = new Item { ItemName = "Milk", ItemID = 2 };
            Cheese = new Item { ItemID = 3, ItemName = "Cheese" };

            EggRecipe = new Recipe
            {
                RecipeID = 0,
                RecipeName = "EggRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantiy = 1 } },
                UserID = 1
            };
            EggRecipe2 = new Recipe
            {
                RecipeID = 1,
                RecipeName = "EggRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantiy = 2 } },
                UserID = 1
            };

            MilkRecipe = new Recipe
            {
                RecipeID = 2,
                RecipeName = "MilkRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantiy = 1 } },
                UserID = 1
            };
            MilkRecipe2 = new Recipe
            {
                RecipeID = 3,
                RecipeName = "MilkRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantiy = 2 } },
                UserID = 1
            };
            CheeseRecipe = new Recipe
            {
                RecipeID = 4,
                RecipeName = "CheeseRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Cheese, Quantiy = 2 } },
                UserID = 2
            };
            MilkAndEggsRecipe = new Recipe
            {
                RecipeID = 4,
                RecipeName = "MilkAndEggsRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs }, new ItemInRecipe { Item = Milk } },
                UserID = 2
            };

            kitchen = new MyKitchen
            {
                ItemsInMyKitchen = new List<ItemInMyKitchen>() { new ItemInMyKitchen { Item = Eggs }, new ItemInMyKitchen { Item = Milk } }
            };

            var data = new List<Recipe>
            {
               EggRecipe, EggRecipe2, MilkRecipe, MilkRecipe2, CheeseRecipe
            };//.AsQueryable();

            _mockSet = new Mock<DbSet<Recipe>>();
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.Provider).Returns(data.AsQueryable().Provider);
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.Expression).Returns(data.AsQueryable().Expression);
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.ElementType).Returns(data.AsQueryable().ElementType);
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.GetEnumerator()).Returns(data.AsQueryable().GetEnumerator);
            _mockSet.Setup(m => m.Add(It.IsAny<Recipe>())).Callback<Recipe>(data.Add);

            _mockContext = new Mock<ShoppingListContext>();
            _mockContext.Setup(m => m.Recipes).Returns(_mockSet.Object);

            _repository = new RecipeRepository(_mockContext.Object);

            /*
            _repository.AddRecipe(EggRecipe);
            _repository.AddRecipe(EggRecipe2);
            _repository.AddRecipe(MilkRecipe);
            */
        }

        [Given(@"I provide an item to the RecipeRepository")]
        public void GivenIProvideAnItemToTheRecipeRepository()
        {
            var result = _repository.GetAllRecipesUsingItem(Eggs);
            _scenarioContext.Add("SearchForRecipesByItemResult", result);
        }

        [When(@"I get a result from the repository")]
        public void WhenIGetAResultFromTheRepository()
        {
        }

        [Then(@"the result should contain only recipes using that item")]
        public void ThenTheResultShouldContainOnlyRecipesUsingThatItem()
        {
            var result = _scenarioContext.Get<IEnumerable<Recipe>>("SearchForRecipesByItemResult");
            result.Should().Contain(EggRecipe);
            result.Should().Contain(EggRecipe2);
        }

        [Then(@"the result should not contain recipes not using that item")]
        public void ThenTheResultShouldNotContainRecipesNotUsingThatItem()
        {
            var result = _scenarioContext.Get<IEnumerable<Recipe>>("SearchForRecipesByItemResult");
            result.Should().NotContain(MilkRecipe);
            result.Should().NotContain(MilkRecipe2);
        }

        [Given(@"I provide a recipe id to the RecipeRepository")]
        public void GivenIProvideARecipeIdToTheRecipeRepository()
        {
            Recipe newRecipe = new Recipe { RecipeName = "MilkAndEggsRecipe2", Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs }, new ItemInRecipe { Item = Milk } } };
            _repository.AddRecipe(newRecipe);
        }

        //Unable to add items to the mocked context - commented out for now
        /*
        [When(@"I GET the recipe")]
        public void WhenIGETTheRecipe()
        {
            Recipe result = _repository.GetRecipeById(4);
            _scenarioContext.Add("Result from asking for recipe with ID 4", result);
        }
        */

        /*
        [Then(@"the result should be the recipe")]
        public void ThenTheResultShouldBeTheRecipe()
        {
            Recipe result = _scenarioContext.Get<Recipe>("Result from asking for recipe with ID 4");
            result.RecipeID.Should().Be(5);
        }
        */

        [Then(@"the recipe should be saved")]
        public void ThenTheResultShouldBeTheRecipe()
        {
            _mockContext.Verify(m => m.Add(It.IsAny<Recipe>()), Times.Once());
            _mockContext.Verify(m => m.SaveChanges(), Times.Once());
        }

        [Given(@"I provide a kitchen to the RecipeRepository")]
        public void GivenIProvideAKitchenToTheRecipeRepository()
        {
            List<Item> items = kitchen.ItemsInMyKitchen.Select(i => i.Item).ToList();
            //Kitchen containing Milk and Eggs
            var result = _repository.GetAllRecipesUsingSeveralItems(items);
            _scenarioContext.Add("Result from searching for recipes by kitchen", result);
        }

        [Then(@"the suggested recipes should contain only recipes using those items")]
        public void ThenTheSuggestedRecipesShouldContainOnlyRecipesUsingThatItem()
        {
            var result = _scenarioContext.Get<IEnumerable<Recipe>>("Result from searching for recipes by kitchen");
            result.Should().Contain(EggRecipe);
            result.Should().Contain(EggRecipe2);
            result.Should().Contain(MilkRecipe);
            result.Should().Contain(MilkRecipe2);
        }

        [Then(@"the suggested recipes should not contain recipes using items not in my kitchen")]
        public void ThenTheSuggestedRecipesShouldNotContainRecipes()
        {
            var result = _scenarioContext.Get<IEnumerable<Recipe>>("Result from searching for recipes by kitchen");
            result.Should().NotContain(CheeseRecipe);
        }

        [Given(@"that the userId is (.*)")]
        public void GivenThatTheUserIdIs(int userId)
        {
            var result = _repository.GetAllUserRecipes(userId);
            _scenarioContext.Add("Result from searching for recipes by userId", result);
        }

        [When(@"the result from the repository are returned")]
        public void WhenTheResultFromTheRepositoryAreReturned()
        {
        }

        [Then(@"the result should contain recipes with userId (.*)")]
        public void ThenTheResultShouldContainRecipesWithUserId(int userId)
        {
            var result = _scenarioContext.Get<List<Recipe>>("Result from searching for recipes by userId");
            result.Should().OnlyContain(r => r.UserID == userId);
        }
    }
}
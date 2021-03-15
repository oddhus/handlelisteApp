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

        Item Eggs;
        Item Milk;

        Recipe EggRecipe;
        Recipe EggRecipe2;
        Recipe MilkRecipe;
        Recipe MilkRecipe2;

        public RecipeRepositorySteps(ScenarioContext scenarioContext)
        {

            _scenarioContext = scenarioContext;

            Eggs = new Item { ItemName = "Eggs", ItemID = 1 };
            Milk = new Item { ItemName = "Milk", ItemID = 2 };

            EggRecipe = new Recipe
            {
                RecipeID = 0,
                RecipeName = "EggRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantiy = 1 } }
            };
            EggRecipe2 = new Recipe
            {
                RecipeID = 1,
                RecipeName = "EggRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantiy = 2 } }
            };

            MilkRecipe = new Recipe
            {
                RecipeID = 2,
                RecipeName = "MilkRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantiy = 2 } }
            };
            MilkRecipe2 = new Recipe
            {
                RecipeID = 3,
                RecipeName = "MilkRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantiy = 2 } }
            };


            var data = new List<Recipe>
            {
               EggRecipe, EggRecipe2, MilkRecipe, MilkRecipe2
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
            Recipe newRecipe = new Recipe { RecipeID = 4, RecipeName = "MilkAndEggsRecipe", Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs }, new ItemInRecipe { Item = Milk } } };
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


    }
}

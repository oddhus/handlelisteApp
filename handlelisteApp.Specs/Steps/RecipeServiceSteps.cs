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
        private RecipeService _service;
        private RecipeDTO recipeDTO;
        private Recipe savedRecipe;
        private Item item;

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
                }
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
                }
            };

            //Mock repos
            _mockRecipeRepo = new Mock<IRecipeRepository>();

            _mockItemRepo = new Mock<IItemRepository>();
            _mockItemRepo.Setup(i => i.FindByItemName(It.IsAny<string>())).Returns(item);

            //Add mock repos to Service
            _service = new RecipeService(_mockRecipeRepo.Object, _mockItemRepo.Object, mapper);
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
    }
}
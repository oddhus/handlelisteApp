using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Mappings.Profiles;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace handlelisteApp.TEST.Data
{
    public class RecipeServiceTest
    {
        private int userId = 1;
        private int userId2 = 5;
        private int recipeId = 3;
        private int recipeId2 = 20;
        private Mock<IRecipeRepository> _mockRecipeRepo;
        private Mock<IShoppingListRepository> _mockShoppingRepo;
        private Mock<IItemRepository> _mockItemRepo;
        private RecipeService _service;
        private SavedRecipeDTO savedRecipeDTO;
        private SavedRecipe savedRecipe;
        private Recipe _recipe;
        public RecipeServiceTest()
        {
            //Configure mapper
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new SavedRecipeProfile());
                mc.AddProfile(new RecipeProfile());
                mc.AddProfile(new ItemInRecipeProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();

            _recipe = new Recipe()
            {
                RecipeID = recipeId,
                RecipeName = "Bolognese",
                ShortDescription = "Nam nam",
                Approach = "Take pasta, take sause eat nam",
                ImgUrl = "https://preview.redd.it/9dtfjhq7ttp11.jpg?auto=webp&s=276d4a1c30049b6f9ef26376be6c3b3aad3692b4",
                Items = new List<ItemInRecipe>()
                {
                    new ItemInRecipe()
                    {
                        ItemID = 123,
                        Quantity = 2,
                        Unit = "Kg"
                    }

                },
                UserSaved = new List<SavedRecipe>()
                {
                }

            };

            Recipe recipe2 = new Recipe()
            {
                RecipeID = 2,
                RecipeName = "Smørbrød",
                ShortDescription = "Digg af",
                Approach = "Brød, smør, ost, skinke varm = nam",
                ImgUrl = "https://hackernoon.com/hn-images/1*6z2rS247RKJJxdWDetYm2Q.png",
                Items = new List<ItemInRecipe>()
                {
                    new ItemInRecipe()
                    {
                        ItemID = 123,
                        Quantity = 2,
                        Unit = "Kg"
                    }

                },
                UserSaved = new List<SavedRecipe>()
                {
                }
            };

            savedRecipeDTO = new SavedRecipeDTO()
            {
                Id = 1,
                UserId = userId,
                RecipeId = recipeId,
                likedOn = DateTime.Now
            };

            SavedRecipeDTO savedRecipeDTO2 = new SavedRecipeDTO()
            {
                Id = 2,
                UserId = userId,
                RecipeId = 4,
                likedOn = DateTime.Now
            };

            savedRecipe = new SavedRecipe()
            {
                Id = 1,
                UserId = userId,
                RecipeId = recipeId,
                likedOn = DateTime.Parse("2015-05-16T05:50:06.7199222-04:00")

            };

            List<Recipe> savedRecipeList = new List<Recipe>();
            savedRecipeList.Add(_recipe);
            savedRecipeList.Add(recipe2);
            //Mock repos
            _mockShoppingRepo = new Mock<IShoppingListRepository>();

            _mockItemRepo = new Mock<IItemRepository>();

            _mockRecipeRepo = new Mock<IRecipeRepository>();
            _mockRecipeRepo.Setup(r => r.SaveRecipe(savedRecipe)).Returns(savedRecipe);
            _mockRecipeRepo.Setup(r => r.GetSavedRecipes(userId)).Returns(savedRecipeList);
            _mockRecipeRepo.Setup(r => r.GetSavedRecipeByRecipeIdAndUserId(userId, recipeId)).Returns(savedRecipe);

            //Add mock repos to Service
            _service = new RecipeService(_mockRecipeRepo.Object, _mockItemRepo.Object, _mockShoppingRepo.Object, mapper);
        }

        [Fact]
        public void ShouldCallSaveRecipeOnRepoWhenUsingSaveRecipe()
        {
            _service.SaveRecipe(userId2, 8);
            _mockRecipeRepo.Verify(m => m.SaveRecipe(It.IsAny<SavedRecipe>()), Times.Once());
        }

        [Fact]
        public void ShouldNotCallSaveRecipeOnRepoWhenUsingSaveRecipeWhenLikeAlreadyExists()
        {
            _service.SaveRecipe(userId, recipeId);
            _mockRecipeRepo.Verify(m => m.SaveRecipe(It.IsAny<SavedRecipe>()), Times.Never());
        }

        [Fact]
        public void SaveRecipeShouldAlwaysReturnSavedRecipeDTO()
        {
            SavedRecipeDTO savedRecipe = _service.SaveRecipe(userId, recipeId);
            Assert.NotNull(savedRecipe);

        }

        [Fact]
        public void SaveRecipeShouldReturnCorrectSavedRecipeDTO()
        {
            SavedRecipeDTO savedDTO = _service.SaveRecipe(userId, recipeId);
            Assert.Equal(savedDTO.Id, savedRecipeDTO.Id);
            Assert.NotEqual(savedDTO.likedOn, DateTime.Now);

            SavedRecipeDTO savedDTO2 = _service.SaveRecipe(userId2, recipeId2);
            Assert.NotEqual(savedDTO, savedDTO2);

        }

        [Fact]
        public void DeleteSavedRecipeShouldReturnTrueWhenDeletedFalseOtherwise()
        {
            Assert.True(_service.DeleteSavedRecipe(userId, recipeId));
            Assert.False(_service.DeleteSavedRecipe(userId2, recipeId2));
        }

        [Fact]
        public void ShouldCallDeleteSavedRecipeOnRecipeRepoWhenGivenValidSavedRecipe()
        {
            _service.DeleteSavedRecipe(userId2, recipeId2);
            _mockRecipeRepo.Verify(m => m.DeleteSavedRecipe(It.IsAny<SavedRecipe>()), Times.Never());
            _service.DeleteSavedRecipe(userId, recipeId);
            _mockRecipeRepo.Verify(m => m.DeleteSavedRecipe(It.IsAny<SavedRecipe>()), Times.Once());
        }

        [Fact]
        public void ShouldGetListOfRecipeDTOWhenCallingGetSavedRecipes()
        {
            List<RecipeDTO> recipes = _service.GetSavedRecipes(userId);
            Assert.NotEmpty(recipes);
        }

    }
}

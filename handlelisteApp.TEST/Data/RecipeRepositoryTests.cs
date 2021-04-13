using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace handlelisteApp.Test.Data
{
    public class RecipeRepositoryTests
    {
        private Mock<DbSet<Recipe>> _mockSet;
        private Mock<ShoppingListContext> _mockContext;

        private RecipeRepository _recipeRepository;

        private Recipe testRecipe1;
        private Recipe testRecipe2;
        private Recipe testRecipe3;



        private Item Eggs;
        private Item Milk;
        private Item Cheese;

        private Recipe EggRecipe;
        private Recipe EggRecipe2;
        private Recipe MilkRecipe;
        private Recipe MilkRecipe2;
        private Recipe CheeseRecipe;
        private Recipe MilkAndEggsRecipe;

        public RecipeRepositoryTests()
        {
            testRecipe1 = new Recipe { RecipeID = 0, Approach = "approach0", RecipeName = "rname0", ShortDescription = "description0" , UserID = 1};
            testRecipe2 = new Recipe { RecipeID = 1, Approach = "approach1", RecipeName = "rname1", ShortDescription = "description1", UserID = 1 };
            testRecipe3 = new Recipe { RecipeID = 2, Approach = "approach2", RecipeName = "rname2", ShortDescription = "description2", UserID = 2 };


            Eggs = new Item { ItemName = "Eggs", ItemID = 1 };
            Milk = new Item { ItemName = "Milk", ItemID = 2 };
            Cheese = new Item { ItemID = 3, ItemName = "Cheese" };

            EggRecipe = new Recipe
            {
                RecipeID = 0,
                RecipeName = "EggRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantity = 1 } },
                UserID = 1
            };
            EggRecipe2 = new Recipe
            {
                RecipeID = 1,
                RecipeName = "EggRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs, Quantity = 2 } },
                UserID = 1
            };

            MilkRecipe = new Recipe
            {
                RecipeID = 2,
                RecipeName = "MilkRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantity = 1 } },
                UserID = 1
            };
            MilkRecipe2 = new Recipe
            {
                RecipeID = 3,
                RecipeName = "MilkRecipe2",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Milk, Quantity = 2 } },
                UserID = 1
            };
            CheeseRecipe = new Recipe
            {
                RecipeID = 4,
                RecipeName = "CheeseRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Cheese, Quantity = 2 } },
                UserID = 2
            };
            MilkAndEggsRecipe = new Recipe
            {
                RecipeID = 5,
                RecipeName = "MilkAndEggsRecipe",
                Items = new List<ItemInRecipe>() { new ItemInRecipe { Item = Eggs }, new ItemInRecipe { Item = Milk } },
                UserID = 2
            };

            var data = new List<Recipe>
            {
                EggRecipe, EggRecipe2, MilkRecipe, MilkRecipe2, CheeseRecipe, MilkAndEggsRecipe


            }.AsQueryable();



            _mockSet = new Mock<DbSet<Recipe>>();
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.Provider).Returns(data.Provider);
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.Expression).Returns(data.Expression);
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.ElementType).Returns(data.ElementType);
            _mockSet.As<IQueryable<Recipe>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            _mockContext = new Mock<ShoppingListContext>();
            _mockContext.Setup(m => m.Recipes).Returns(_mockSet.Object);

            _recipeRepository = new RecipeRepository(_mockContext.Object);

        }

        [Fact]
        public void ShouldAddRecipeToContextWhenAddingRecipe()
        {
            Recipe newRecipe = new Recipe { Approach = "approach3", RecipeName = "rname3", ShortDescription = "description3" };
            _recipeRepository.AddRecipe(newRecipe);
            _mockContext.Verify(m => m.Add(It.IsAny<Recipe>()), Times.Once);
        }

        [Fact]
        public void ShouldCallSaveChangesOnContextWhenAddingRecipe()
        {
            Recipe newRecipe = new Recipe { Approach = "approach3", RecipeName = "rname3", ShortDescription = "description3" };

            _recipeRepository.AddRecipe(newRecipe);
            _mockContext.Verify(m => m.SaveChanges(), Times.Once);

        }

        [Fact]
        public void ShouldCallRemoveOnContextWhenDeletingRecipe()
        {
            _recipeRepository.DeleteRecipe(testRecipe1);
            _mockContext.Verify(m => m.Recipes.Remove(It.IsAny<Recipe>()), Times.Once);
        }

        [Fact]
        public void ShouldCallSaveChangesOnContextWhenDeletingRecipe()
        {
            _recipeRepository.DeleteRecipe(testRecipe1);
            _mockContext.Verify(m => m.SaveChanges(), Times.Once);
        }

        [Fact]
        public void GetAllRecipesReturnsAllRecipes()
        {
            var result = _recipeRepository.GetAllRecipes();
            Assert.Equal(6, result.Count());
            Assert.Contains(EggRecipe, result);
            Assert.Contains(EggRecipe2, result);
            Assert.Contains(MilkRecipe, result);
            Assert.Contains(MilkRecipe2, result);
            Assert.Contains(MilkAndEggsRecipe, result);
            Assert.Contains(CheeseRecipe, result);
        }

        [Fact]
        public void GetAllUserRecipesReturnsRecipesByThatUserAndNoOtherRecipes()
        {
            var result = _recipeRepository.GetAllUserRecipes(1);
            Assert.Contains(MilkRecipe, result);
            Assert.Contains(MilkRecipe2, result);
            Assert.Contains(EggRecipe, result);
            Assert.Contains(EggRecipe2, result);
            Assert.DoesNotContain(MilkAndEggsRecipe, result);
            Assert.DoesNotContain(CheeseRecipe, result);
        }

        [Fact]
        public void GetAllRecipesUsingItemsReturnsRecipesUsingThatItemAndNoOtherRecipes()
        {
            var result = _recipeRepository.GetAllRecipesUsingItem(Milk);
            Assert.Contains(MilkRecipe, result);
            Assert.Contains(MilkRecipe2, result);
            Assert.Contains(MilkAndEggsRecipe, result);
            Assert.DoesNotContain(EggRecipe, result);
            Assert.DoesNotContain(EggRecipe2, result);
            Assert.DoesNotContain(CheeseRecipe, result);
        }

    }
}

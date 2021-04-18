using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
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
        private Mock<DbSet<Recipe>> _mockRecipeSet;
        private Mock<DbSet<SavedRecipe>> _mockSavedRecipeSet;
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

        private SavedRecipe savedRecipe1;
        private SavedRecipe savedRecipe2;

        public RecipeRepositoryTests()
        {
            testRecipe1 = new Recipe { RecipeID = 0, Approach = "approach0", RecipeName = "rname0", ShortDescription = "description0", UserID = 1 };
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

            var recipeData = new List<Recipe>
            {
                EggRecipe, EggRecipe2, MilkRecipe, MilkRecipe2, CheeseRecipe, MilkAndEggsRecipe


            }.AsQueryable();





            _mockRecipeSet = new Mock<DbSet<Recipe>>();
            _mockRecipeSet.As<IQueryable<Recipe>>().Setup(m => m.Provider).Returns(recipeData.Provider);
            _mockRecipeSet.As<IQueryable<Recipe>>().Setup(m => m.Expression).Returns(recipeData.Expression);
            _mockRecipeSet.As<IQueryable<Recipe>>().Setup(m => m.ElementType).Returns(recipeData.ElementType);
            _mockRecipeSet.As<IQueryable<Recipe>>().Setup(m => m.GetEnumerator()).Returns(recipeData.GetEnumerator());


            savedRecipe1 = new SavedRecipe { RecipeId = MilkRecipe.RecipeID, Recipe = MilkRecipe, UserId = 1 };
            savedRecipe2 = new SavedRecipe { RecipeId = EggRecipe.RecipeID, Recipe = EggRecipe, UserId = 1 };

            var savedRecipeData = new List<SavedRecipe> { savedRecipe1, savedRecipe2 }.AsQueryable();

            _mockSavedRecipeSet = new Mock<DbSet<SavedRecipe>>();
            _mockSavedRecipeSet.As<IQueryable<SavedRecipe>>().Setup(m => m.Provider).Returns(savedRecipeData.Provider);
            _mockSavedRecipeSet.As<IQueryable<SavedRecipe>>().Setup(m => m.Expression).Returns(savedRecipeData.Expression);
            _mockSavedRecipeSet.As<IQueryable<SavedRecipe>>().Setup(m => m.ElementType).Returns(savedRecipeData.ElementType);
            _mockSavedRecipeSet.As<IQueryable<SavedRecipe>>().Setup(m => m.GetEnumerator()).Returns(savedRecipeData.GetEnumerator());



            _mockContext = new Mock<ShoppingListContext>();
            _mockContext.Setup(m => m.Recipes).Returns(_mockRecipeSet.Object);
            _mockContext.Setup(m => m.SavedRecipes).Returns(_mockSavedRecipeSet.Object);

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
            var result = _recipeRepository.GetAllRecipes(new RecipeParameters());
            Assert.Equal(6, result.recipes.Count());
            Assert.Contains(EggRecipe, result.recipes);
            Assert.Contains(EggRecipe2, result.recipes);
            Assert.Contains(MilkRecipe, result.recipes);
            Assert.Contains(MilkRecipe2, result.recipes);
            Assert.Contains(MilkAndEggsRecipe, result.recipes);
            Assert.Contains(CheeseRecipe, result.recipes);
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

        [Fact]
        public void GetAllRecipesUsingSeveralItemsReturnsRecipesUsingThoseItemsAndNoOtherRecipes()
        {
            List<Item> items = new List<Item> { Milk, Eggs };
            var result = _recipeRepository.GetAllRecipesUsingSeveralItems(items);

            Assert.Contains(MilkRecipe, result);
            Assert.Contains(MilkRecipe2, result);
            Assert.Contains(EggRecipe, result);
            Assert.Contains(EggRecipe2, result);
            Assert.Contains(MilkAndEggsRecipe, result);
            Assert.DoesNotContain(CheeseRecipe, result);
        }

        [Fact]
        public void UpdatingANullItemShouldThrowException()
        {
            Assert.Throws<ArgumentNullException>(() => _recipeRepository.UpdateRecipe(0, null));
        }

        [Fact]
        public void UpdatingAnItemShouldCallSaveChangesOnContext()
        {
            Recipe updatedRecipe = MilkRecipe;
            updatedRecipe.Approach = "Updated approach";
            _recipeRepository.UpdateRecipe(1, updatedRecipe);

            _mockContext.Verify(m => m.SaveChanges(), Times.Once);
        }

        [Fact]
        public void UpdatingAnItemShouldCallUpdateOnContext()
        {
            Recipe updatedRecipe = MilkRecipe;
            updatedRecipe.Approach = "Updated approach";
            _recipeRepository.UpdateRecipe(1, updatedRecipe);

            _mockContext.Verify(m => m.Recipes.Update(It.IsAny<Recipe>()), Times.Once);

        }

        [Fact]
        public void GetSavedRecipesShouldReturnOnlySavedRecipesAndNoOtherRecipes()
        {
            var result = _recipeRepository.GetSavedRecipes(1);

            Assert.Contains(MilkRecipe, result);
            Assert.Contains(EggRecipe, result);
            Assert.DoesNotContain(MilkRecipe2, result);
            Assert.DoesNotContain(EggRecipe2, result);
            Assert.DoesNotContain(MilkAndEggsRecipe, result);
            Assert.DoesNotContain(CheeseRecipe, result);
        }

        [Fact]
        public void SaveRecipeShouldCallSaveChangesOnContext()
        {
            SavedRecipe savedRecipe = new SavedRecipe { Recipe = CheeseRecipe, UserId = 1 };

            _recipeRepository.SaveRecipe(savedRecipe);

            _mockContext.Verify(m => m.SaveChanges(), Times.Once);

        }

        [Fact]
        public void SaveRecipeShouldCallAddOnContext()
        {
            SavedRecipe savedRecipe = new SavedRecipe { Recipe = CheeseRecipe, UserId = 1 };

            _recipeRepository.SaveRecipe(savedRecipe);

            _mockContext.Verify(m => m.SavedRecipes.Add(It.IsAny<SavedRecipe>()), Times.Once);
        }

        [Fact]
        public void DeleteSavedRecipeShouldCallRemoveOnContext()
        {
            _recipeRepository.DeleteSavedRecipe(savedRecipe1);

            _mockContext.Verify(m => m.SavedRecipes.Remove(It.IsAny<SavedRecipe>()), Times.Once);
        }

        [Fact]
        public void DeleteSavedRecipeShouldCallSaveChangesOnContext()
        {
            _recipeRepository.DeleteSavedRecipe(savedRecipe1);

            _mockContext.Verify(m => m.SaveChanges(), Times.Once);
        }

    }
}

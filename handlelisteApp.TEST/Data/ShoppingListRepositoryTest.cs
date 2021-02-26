using System;
using System.Collections.Generic;
using System.Linq;
using handlelisteApp.Context;
using handlelisteApp.Data;
using handlelisteApp.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;


namespace handlelisteApp.TEST.Data
{

    public class ShoppingListRepositoryTest
    {

        private Mock<DbSet<ShoppingList>> _mockSet;

        private ShoppingListRepository _repo;

        private Mock<ShoppingListContext> _mockContext;

        public ShoppingListRepositoryTest()
        {
            var data = new List<ShoppingList>
            {
                new ShoppingList { ShoppingListID = 1, UserId = 1 },
                new ShoppingList { ShoppingListID = 2, UserId = 1 },
                new ShoppingList { ShoppingListID = 3, UserId = 2 },
            }.AsQueryable();

            _mockSet = new Mock<DbSet<ShoppingList>>();
            _mockSet.As<IQueryable<ShoppingList>>().Setup(m => m.Provider).Returns(data.Provider);
            _mockSet.As<IQueryable<ShoppingList>>().Setup(m => m.Expression).Returns(data.Expression);
            _mockSet.As<IQueryable<ShoppingList>>().Setup(m => m.ElementType).Returns(data.ElementType);
            _mockSet.As<IQueryable<ShoppingList>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());


            _mockContext = new Mock<ShoppingListContext>();
            _mockContext.Setup(m => m.ShoppingLists).Returns(_mockSet.Object);

            _repo = new ShoppingListRepository(_mockContext.Object);
        }

        [Fact]
        public void ShouldCallSaveChangesOnShoppingListRepo()
        {
            _repo.SaveChanges();
            _mockContext.Verify(m => m.SaveChanges(), Times.Once());
        }

        [Fact]
        public void ShouldCallAddOnShoppingListRepo()
        {
            _repo.AddShoppingList(new ShoppingList());
            _mockSet.Verify(m => m.Add(It.IsAny<ShoppingList>()), Times.Once());
        }

        [Fact]
        public void ShouldCallRemoveOnShoppingListRepo()
        {
            _repo.DeleteShoppingList(new ShoppingList());
            _mockSet.Verify(m => m.Remove(It.IsAny<ShoppingList>()), Times.Once());
        }

        [Fact]
        public void ShouldFindShoppingListById()
        {
            var foundShoppingList = _repo.FindShoppingListById(1);
            Assert.True(foundShoppingList.ShoppingListID == 1);
        }

        [Fact]
        public void ShouldFindAllOfUsersShoppingListsById()
        {
            var foundShoppingLists = _repo.FindShoppingListByUserId(1);
            Assert.True(foundShoppingLists.Count() == 2);
        }
    }
}

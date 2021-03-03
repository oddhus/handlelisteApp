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

    public class ItemRepositoryTests
    {

        private Mock<DbSet<Item>> _mockSet;

        private ItemRepository _repo;

        private Mock<ShoppingListContext> _mockContext;

        public ItemRepositoryTests()
        {
            var data = new List<Item>
            {
                new Item { ItemID = 1, ItemName = "is" },
                new Item { ItemID = 2, ItemName = "brus" },
                new Item { ItemID = 3, ItemName = "pizza" },
            }.AsQueryable();

            _mockSet = new Mock<DbSet<Item>>();
            _mockSet.As<IQueryable<Item>>().Setup(m => m.Provider).Returns(data.Provider);
            _mockSet.As<IQueryable<Item>>().Setup(m => m.Expression).Returns(data.Expression);
            _mockSet.As<IQueryable<Item>>().Setup(m => m.ElementType).Returns(data.ElementType);
            _mockSet.As<IQueryable<Item>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());


            _mockContext = new Mock<ShoppingListContext>();
            _mockContext.Setup(m => m.Items).Returns(_mockSet.Object);

            _repo = new ItemRepository(_mockContext.Object);
        }

        [Fact]
        public void ShouldCallSaveChangesOnItemsContext()
        {
            _repo.SaveChanges();
            _mockContext.Verify(m => m.SaveChanges(), Times.Once());
        }

        [Fact]
        public void ShouldCallAddOnItemsContext()
        {
            _repo.AddItem(new Item());
            _mockSet.Verify(m => m.Add(It.IsAny<Item>()), Times.Once());
        }

        [Fact]
        public void ShouldCallRemoveOnItemsContext()
        {
            _repo.DeleteItem(new Item());
            _mockSet.Verify(m => m.Remove(It.IsAny<Item>()), Times.Once());
        }

        [Fact]
        public void ShouldThrowExceptionIfItemIsNullInDeleteList()
        {
            var ex = Assert.Throws<ArgumentNullException>(() => _repo.DeleteItem(null));
            Assert.Equal("Value cannot be null. (Parameter 'item')", ex.Message);
        }

        [Fact]
        public void ShouldFindItemByItemName()
        {
            var foundItem = _repo.FindByItemName("is");
            Assert.True(foundItem.ItemID == 1);
        }

        [Fact]
        public void ShouldThrowExceptionIfItemIsNullInAddShoppingList()
        {
            var ex = Assert.Throws<ArgumentNullException>(() => _repo.AddItem(null));
            Assert.Equal("Value cannot be null. (Parameter 'item')", ex.Message);
        }

        [Fact]
        public void ShouldCallAddRangeWhenInsertingMultipleItems()
        {
            var data = new List<Item>
            {
                new Item { ItemID = 1, ItemName = "is" },
                new Item { ItemID = 2, ItemName = "brus" },
                new Item { ItemID = 3, ItemName = "pizza" },
            };


            _repo.AddItems(data);
            _mockSet.Verify(m => m.AddRange(It.IsAny<List<Item>>()), Times.Once());
        }
    }
}

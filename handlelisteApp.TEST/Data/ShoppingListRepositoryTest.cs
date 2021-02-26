using System;
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
        [Fact]
        public void ShouldAddEmptyShoppingList()
        {
            var mockSet = new Mock<DbSet<ShoppingList>>();

            var mockContext = new Mock<ShoppingListContext>();
            mockContext.Setup(m => m.ShoppingLists).Returns(mockSet.Object);

            var repo = new ShoppingListRepository(mockContext.Object);
            repo.AddShoppingList(new ShoppingList());

            mockSet.Verify(m => m.Add(It.IsAny<ShoppingList>()), Times.Once());
        }

    }
}

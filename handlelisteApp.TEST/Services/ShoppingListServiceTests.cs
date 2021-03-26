using System;
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

    public class ShoppingListServiceTests
    {
        private int userId = 1;
        private int shoppingListId = 12;
        private Mock<IShoppingListRepository> _mockShoppingRepo;
        private Mock<IItemRepository> _mockItemRepo;
        private ShoppingListService _service;
        private ShoppingListCreateUpdateDTO createDTO;
        private ShoppingList savedShoppinglist;
        private Item item;
        public ShoppingListServiceTests()
        {
            //Configure mapper
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new ShoppingListProfile());
                mc.AddProfile(new ItemOnShoppingListProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();

            item = new Item()
            {
                ItemID = 1234,
                ItemName = "brus"
            };

            //Create input
            createDTO = new ShoppingListCreateUpdateDTO()
            {
                Items = new List<ItemOnShoppingListCreateDTO>(){
                    new ItemOnShoppingListCreateDTO()
                    {
                        ItemName = "brus",
                        Quantity = 2,
                        HasBeenBought = true
                    }
                }
            };

            savedShoppinglist = new ShoppingList()
            {
                ShoppingListID = shoppingListId,
                UserId = userId,
                UpdatedOn = DateTime.Now,
                CreatedOn = DateTime.Now,
                Items = new List<ItemOnShoppingList>(){
                    new ItemOnShoppingList()
                    {
                        ItemId = 123,
                        Quantity = 2,
                        Item = item,
                        HasBeenBought = true
                    }
                }
            };

            //Mock repos
            _mockShoppingRepo = new Mock<IShoppingListRepository>();
            _mockShoppingRepo.Setup(r => r.FindShoppingListByUserIdAndListId(userId, shoppingListId)).Returns(savedShoppinglist);
            _mockShoppingRepo.Setup(r => r.FindShoppingListsByUserId(userId)).Returns(new List<ShoppingList>() { savedShoppinglist });

            _mockItemRepo = new Mock<IItemRepository>();
            _mockItemRepo.Setup(i => i.FindByItemName(It.IsAny<string>())).Returns(item);

            //Add mock repos to Service
            _service = new ShoppingListService(_mockShoppingRepo.Object, _mockItemRepo.Object, mapper);
        }

        [Fact]
        public void ShouldCallAddShoppingListOnRepoWhenUsingCreateShoppingList()
        {
            _service.CreateShoppingList(userId, createDTO);
            _mockShoppingRepo.Verify(m => m.AddShoppingList(It.IsAny<ShoppingList>()), Times.Once());
        }

        [Fact]
        public void ShouldCallSaveChangesOnRepoWhenUsingCreateShoppingList()
        {
            _service.CreateShoppingList(userId, createDTO);
            _mockShoppingRepo.Verify(m => m.SaveChanges(), Times.Once());
        }

        [Fact]
        public void ShouldCallFindByItemNameOnItemRepoWhenUsingCreateShoppingList()
        {
            _service.CreateShoppingList(userId, createDTO);
            _mockItemRepo.Verify(m => m.FindByItemName(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenCreatingShoppingList()
        {
            var retValue = _service.CreateShoppingList(userId, createDTO);
            Assert.NotNull(retValue);
            Assert.True(retValue.Items[0].ItemName == item.ItemName);
        }

        [Fact]
        public void ShouldCallUpdateShoppingListOnRepoWhenUsingUpdateShoppingList()
        {
            _service.UpdateShoppingList(userId, shoppingListId, createDTO);
            _mockShoppingRepo.Verify(m => m.UpdateShoppingList(It.IsAny<ShoppingList>()), Times.Once());
        }

        [Fact]
        public void ShouldCallSaveChangesOnRepoWhenUsingUpdateShoppingList()
        {
            _service.UpdateShoppingList(userId, shoppingListId, createDTO);
            _mockShoppingRepo.Verify(m => m.SaveChanges(), Times.Once());
        }


        [Fact]
        public void ShouldCallFindByItemNameOnItemRepoWhenUsingUpdateShoppingList()
        {
            _service.UpdateShoppingList(userId, shoppingListId, createDTO);
            _mockItemRepo.Verify(m => m.FindByItemName(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenUpdatingShoppingList()
        {
            var retValue = _service.UpdateShoppingList(userId, shoppingListId, createDTO);
            Assert.NotNull(retValue);
            Assert.True(retValue.Items[0].ItemName == item.ItemName);
        }

        [Fact]
        public void ShouldUpdateUpdatedOnValueWhenUpdatingShoppingList()
        {
            var firstUpdatedOn = savedShoppinglist.UpdatedOn;
            var retValue = _service.UpdateShoppingList(userId, shoppingListId, createDTO);
            Assert.True(retValue.CreatedOn == savedShoppinglist.CreatedOn);
            Assert.True(retValue.UpdatedOn != firstUpdatedOn);
        }

        [Fact]
        public void ShouldFindShoppingListByUserIdandListId()
        {
            var retValue = _service.GetShoppingListByUserIdAndListId(userId, shoppingListId);
            Assert.NotNull(retValue);
            Assert.True(retValue.ShoppingListID == shoppingListId);
        }

        [Fact]
        public void ShouldFindAllUserShoppingListByUserId()
        {
            var retValue = _service.GetAllUserShoppingListsByUserId(userId);
            Assert.NotNull(retValue);
            Assert.True(retValue.Count == 1);
        }

        [Fact]
        public void ShouldDeleteShoppingListByUserIdAndListId()
        {
            _service.DeleteShoppingList(userId, shoppingListId);
            _mockShoppingRepo.Verify(m => m.DeleteShoppingList(It.IsAny<ShoppingList>()), Times.Once());
            _mockShoppingRepo.Verify(m => m.FindShoppingListByUserIdAndListId(userId, shoppingListId), Times.Once());
        }
    }
}

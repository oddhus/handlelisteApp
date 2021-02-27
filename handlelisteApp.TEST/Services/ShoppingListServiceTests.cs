using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using handlelisteApp.Context;
using handlelisteApp.Data;
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
        private Mock<IShoppingListRepository> _mockRepo;
        private ShoppingListService _service;
        private ShoppingListCreateDTO createDTO;
        private ShoppingListReadDTO readDTO;
        public ShoppingListServiceTests()
        {
            createDTO = new ShoppingListCreateDTO()
            {
                UserID = 1,
                Items = new List<ItemOnShoppingListDTO>(){
                    new ItemOnShoppingListDTO()
                    {
                        ItemId = 123,
                        Quantity = 2,
                    }
                }
            };

            readDTO = new ShoppingListReadDTO()
            {
                ShoppingListID = 1,
                Items = new List<ItemOnShoppingListReadDTO>()
                {
                    new ItemOnShoppingListReadDTO()
                    {
                        ItemId = 123,
                        Quantity = 2
                    }
                }
            };

            _mockRepo = new Mock<IShoppingListRepository>();
            var mapper = new Mock<IMapper>();

            mapper.Setup(m => m.Map<ShoppingListReadDTO>(It.IsAny<ShoppingList>())).Returns(readDTO);

            _service = new ShoppingListService(_mockRepo.Object, mapper.Object);
        }

        [Fact]
        public void ShouldCallAddShoppingListOnRepoWhenUsingCreateShoppingList()
        {
            _service.CreateShoppingList(1, createDTO);
            _mockRepo.Verify(m => m.AddShoppingList(It.IsAny<ShoppingList>()), Times.Once());
        }

        [Fact]
        public void ShouldCallSaveChangesOnRepoWhenUsingCreateShoppingList()
        {
            _service.CreateShoppingList(1, createDTO);
            _mockRepo.Verify(m => m.SaveChanges(), Times.Once());
        }

        [Fact]
        public void ShouldReturnShoppingListReadDTOWhenCreatingShoppingList()
        {
            var retValue = _service.CreateShoppingList(1, createDTO);
            Assert.StrictEqual(retValue, readDTO);
        }

    }
}
